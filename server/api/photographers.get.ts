import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async () => {
  const photographers = await prisma.photographer.findMany({
    where: {
      isVerified: true,
    },
    include: {
      photos: true,
      ratings: true,
    },
  });

  return photographers;
});
