import {prisma} from "../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return { status: 400, message: "Missing ID" };

  const photographer = await prisma.photographer.update({
    where: { id: Number(id) },
    data: {
      isVerified: true,
    }
  });

  if (!photographer) return { status: 404, message: "Not found" };

  return {status: 200, message: "Photographer verified successfully", photographer: photographer};
});
