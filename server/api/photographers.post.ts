import { prisma } from "~/server/utils/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { mkdir } from "fs/promises";

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);
    if (!form) {
      throw createError({
        statusCode: 400,
        statusMessage: "Форма не надійшла"
      });
    }
    const fields: Record<string, any> = {};
    const photos: { filename: string; data: Buffer; type: string }[] = [];

    for (const item of form) {
      if (item.type === "file") {
      photos.push({
        filename: item.filename,
        data: item.data,
        type: item.mimetype
      });
      } else {
      fields[item.name] = item.data;
      }
    }

    // Валидация числовых полей
    if (isNaN(Number(Buffer.from(fields.price).toString()))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Ціна має бути числом"
      });
    }

    if (Number(Buffer.from(fields.price).toString()) < 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Ціна не може бути від'ємною"
      });
    }

    if (isNaN(Number(Buffer.from(fields.userId).toString()))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Невірний ідентифікатор користувача"
      });
    }


    const fullName = `${Buffer.from(fields.firstName).toString()} ${Buffer.from(fields.lastName).toString()}`.trim();

    // Проверка уникальности
    const existing = await prisma.photographer.findFirst({
      where: {
        OR: [
          { name: fullName },
          { userId: Number(fields.userId) }
        ]
      }
    });

    if (existing) {
      throw createError({
        statusCode: 400,
        statusMessage: existing.name === fullName 
          ? "Фотограф з таким іменем вже існує" 
          : "Ви вже створили анкету фотографа"
      });
    }

    // Создание фотографа
    const photographer = await prisma.photographer.create({
      data: {
        name: fullName,
        city: Buffer.from(fields.city).toString(),
        style: Buffer.from(fields.style).toString(),
        price: Number(Buffer.from(fields.price).toString()),
        about: Buffer.from(fields.about).toString(),
        isVerified: false,
        userId: Number(Buffer.from(fields.userId).toString()),
      },
    });

    return {
      success: true,
      message: "Анкету надіслано! Очікуйте підтвердження.",
      id: photographer.id,
      uploadedPhotos: photos.length,
    };

  } catch (error: any) {
    console.error('Error in photographer submission:', error);
    
    if (error.statusCode) {
      throw error;
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: "Внутрішня помилка сервера"
    });
  }
});