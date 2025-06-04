export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return { status: 400, message: "Missing ID" };

  const photographer = await prisma.photographer.findUnique({
    where: { id: Number(id) },
    include: {
      photos: true,
    },
  });

  if (!photographer) return { status: 404, message: "Not found" };

  const ratings = await prisma.rating.findMany({
    where: { photographerId: Number(id) },
  });

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : null;

  return {
    ...photographer,
    reviews: ratings,
    rating: averageRating,
  };
});
