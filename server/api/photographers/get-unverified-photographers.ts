import { prisma } from "../../utils/prisma";

export default defineEventHandler(async () => {
  const unverified = await prisma.photographer.findMany({
    where: { isVerified: false },
  });
  if(!unverified) return { status: 404, message: "No unverified photographers found" };

  return unverified;
});
