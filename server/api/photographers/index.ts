import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const photographers = await prisma.photographer.findMany({
    include: {
      photos: true,
      ratings: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return photographers;
});
