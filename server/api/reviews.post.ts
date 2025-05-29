// ✅ API-файл для створення нового відгуку
// Файл: server/api/reviews.post.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { author, comment, rating, photographerId } = body;

    if (!author || !comment || !rating || !photographerId) {
      return { success: false, message: "Заповніть усі обов’язкові поля" };
    }

    const review = await prisma.rating.create({
      data: {
        author,
        comment,
        rating: Number(rating),
        photographerId: Number(photographerId),
      },
    });

    return {
      success: true,
      message: "Відгук збережено!",
      review,
    };
  } catch (error) {
    console.error("Помилка створення відгуку:", error);
    return {
      success: false,
      message: "Помилка на сервері",
    };
  }
});
