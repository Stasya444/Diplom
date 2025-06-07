import jwt from "jsonwebtoken";
import { getCookie } from "h3";
import { use } from "react";

export default defineEventHandler(async (event) => {
  const token = event.context.params?.id;
  if (!token) return { status: 400, message: "Missing token" };

  try {
    const decoded = jwt.verify(token, "secret_key");
    const id = decoded.role.id;
    if(!id) return { role: "guest" };
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
    return user || { role: "guest" };
  } catch (error) {
    return { role: "guest" };
  }
});