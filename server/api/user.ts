import { getCookie } from "h3";
import jwt from "jsonwebtoken";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");

  if (!token) {
    return { role: "guest" };
  }

  try {
    const decoded = jwt.verify(token, "secret_key") as {
      id: number;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return { role: "guest" };
    }

    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  } catch (err) {
    return { role: "guest" };
  }
});
