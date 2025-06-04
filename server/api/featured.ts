import { prisma } from "~/server/utils/prisma";
export default defineEventHandler(async () => {
  const photos = await prisma.photo.findMany({
    where: { isFeatured: true },
    orderBy: { id: "desc" },
    take: 8,
  });

  return photos;
});
