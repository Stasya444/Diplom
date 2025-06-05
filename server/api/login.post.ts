import { prisma } from "~/server/utils/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    return { success: false, message: "Введіть email і пароль" };
  }

  // 🔍 Валідація email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Некоректний email" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: "Користувача не знайдено" };
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Невірний пароль" };
  }

  // 🔐 Створення токена
  const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
    expiresIn: "7d",
  });

  // 🍪 Збереження токена в cookie
  setCookie(event, "token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 днів
  });

  // 🧠 Збереження даних у cookie (необов'язково)
  setCookie(event, "user_email", email, {
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
      email: user.email,
    },
  };
});
