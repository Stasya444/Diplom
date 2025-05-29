import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async () => {
  const unverified = await prisma.photographer.findMany({
    where: { isVerified: false },
  });

  return unverified;
});
