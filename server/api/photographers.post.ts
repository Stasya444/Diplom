import { prisma } from "~/server/utils/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);
  if (!form) {
    return { success: false, message: "Форма не надійшла." };
  }

  const fields: Record<string, string> = {};
  const photos: string[] = [];

  for (const item of form) {
    if (item.type === "file" && item.filename && item.data) {
      const fileName = `${uuidv4()}-${item.filename}`;
      const filePath = join("public", "uploads", fileName);
      await writeFile(filePath, item.data);
      photos.push(`/uploads/${fileName}`);
    } else if (item.type === "field" && item.name && item.data) {
      fields[item.name] = Buffer.from(item.data).toString("utf8");
    }
  }

  // Валідація обов'язкових полів
  const required = ["firstName", "lastName", "city", "style", "price", "about"];
  for (const key of required) {
    if (!fields[key]) {
      return { success: false, message: `Поле ${key} є обов’язковим` };
    }
  }

  if (isNaN(Number(fields.price))) {
    return { success: false, message: "Ціна має бути числом" };
  }

  const fullName = `${fields.firstName} ${fields.lastName}`.trim();

  // Перевірка на унікальність
  const existing = await prisma.photographer.findFirst({
    where: { name: fullName },
  });
  if (existing) {
    return { success: false, message: "Фотограф з таким іменем вже існує" };
  }

  // Створення фотографа з isVerified: false
  const photographer = await prisma.photographer.create({
    data: {
      name: fullName,
      city: fields.city,
      style: fields.style,
      price: Number(fields.price),
      about: fields.about,
      isVerified: false,
    },
  });

  // Збереження фото
  for (const url of photos) {
    await prisma.photo.create({
      data: {
        url: url,
        photographerId: photographer.id,
      },
    });
  }

  return {
    success: true,
    message: "Анкету надіслано! Очікуйте підтвердження.",
    id: photographer.id,
    uploadedPhotos: photos.length,
  };
});
