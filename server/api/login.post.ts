import { prisma } from "~/server/utils/prisma";
import { compare } from "bcryptjs";
import { default as jwt } from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    return { success: false, message: "Введіть email і пароль" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { success: false, message: "Користувача не знайдено" };
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Невірний пароль" };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
    expiresIn: "7d",
  });

  setCookie(event, "token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    message: "Вхід успішний",
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
});
