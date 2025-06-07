import { prisma } from "~/server/utils/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    return { success: false, message: "Введіть email і пароль" };
  }
  let isEmail = !email.startsWith("+380");

  // Валідація email та номеру телефону
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm; // Повинен бути: username@domain.com
  if (!emailRegex.test(email)) {
    if(email.startsWith("+380") && email.length !== 13) { // Перевірка на телефон
      return {
        success: false,
        message: "Телефон має починатися з +380 та містити 12 символів",
      }
    }

    return { success: false, message: "Некоректний email" };
  }

  const user = await prisma.user.findUnique({ where: { 
    email: isEmail ? email : undefined,
    phone: !isEmail ? email : undefined,
   } });
  if (!user) {
    return { success: false, message: "Користувача не знайдено" };
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Невірний пароль" };
  }

  // Створення токена
  const payload = {
        user_id: user.id,
        role: user
    }
  const token = jwt.sign(payload, 'secret_key', {
          expiresIn: '7d'
      });


  // Збереження токена в cookie
  setCookie(event, "token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 днів
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 днів
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
