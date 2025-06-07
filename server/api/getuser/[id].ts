export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return { status: 400, message: "Missing ID" };

  const user = await prisma.user.findUnique({ 
    where: { 
        id: Number(id)
    },
    select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
    }
})

  if (!user) return { status: 404, message: "Not found" };


  return {
    user
  };
});
