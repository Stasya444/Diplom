import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const photographerId = body.id;

  if (!photographerId) {
    return { success: false, message: "ID не надано" };
  }

  const updated = await prisma.photographer.update({
    where: { id: photographerId },
    data: { isVerified: true },
  });

  return { success: true, photographer: updated };
});
