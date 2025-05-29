import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const photographer = await prisma.photographer.findUnique({
    where: { id: Number(id) },
  });

  return photographer;
});
