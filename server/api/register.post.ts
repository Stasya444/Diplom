import { prisma } from "~/server/utils/prisma";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, phone, password, confirmPassword, role } = body;

    // Валідація
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || role == undefined) {
      return { success: false, message: "Усі поля обов’язкові" };
    }
    // Валідація email
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm; // username@domain.com
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message:
          "Email має бути у форматі Gmail (наприклад, example@gmail.com)",
      };
    }
    if(!phone.startsWith("+380") || phone.length !== 13) {
      return {
        success: false,
        message: "Телефон має починатися з +380 і містити 12 символів",
      }
    }
    // Якщо пароль більше 24 символів
    if (password.trim().length < 6) {
      return {
        success: false,
        message: "Пароль має містити мінімум 6 символів",
      };
    }
    // Якщо пароль більше 24 символів
    if (password.trim().length > 24) {
      return {
        success: false,
        message: "Пароль не має перевищувати 24 символи",
      };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Паролі не збігаються" };
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role ? "photographer" : "guest",
      },
    });

    // Генерація JWT токена
    const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
      expiresIn: "7d",
    });

    // Збереження токена в cookie
    setCookie(event, "token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 днів
    });

    return {
      success: true,
      message: "Реєстрація успішна",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Користувач з таким email вже існує",
      };
    }

    console.error("Помилка реєстрації:", error);
    return {
      success: false,
      message: "Помилка сервера",
    };
  }
});
