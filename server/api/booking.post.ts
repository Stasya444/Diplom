import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, phone, date, photographerId } = body;

  if (!name || !phone || !date || !photographerId) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Всі поля обовʼязкові" })
    );
  }

  const booking = await prisma.booking.create({
    data: {
      name,
      phone,
      date: new Date(date),
      photographerId: Number(photographerId),
    },
  });

  return booking;
});
