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

    for (const item of form) {
      fields[item.name] = Buffer.isBuffer(item.data) ? item.data.toString() : item.data;
    }

    const name = fields.name,
      bio = fields.about,
      city = fields.city,
      style = fields.style,
      price = fields.price;

    if(!name || !bio || !city || !style || !price) {
      return {
        statusCode: 400,
        statusMessage: "Всі поля обовʼязкові"
      };
    }

    const update = await prisma.photographer.update({
      where: {
        id: Number(event.context.params?.id)
      },
      data: {
        name,
        about: bio,
        city,
        style,
        price: Number(price)
      }
    });
    if(!update) {
      return {
        statusCode: 404,
        statusMessage: "Фотограф не знайдений"
      };
    }

    return {
      statusCode: 200,
      message: "Фотограф успішно оновлений",
      photographer: update
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