import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const photos = await prisma.photo.findMany({
    where: { isFeatured: true },
    orderBy: { id: "desc" },
    take: 8,
  });

  return photos;
});
