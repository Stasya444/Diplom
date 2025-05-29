import { prisma } from "~/server/utils/prisma";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password, confirmPassword, role } = body;

    // 🔒 Валідація
    if (!name || !email || !password || !confirmPassword || !role) {
      return { success: false, message: "Усі поля обов’язкові" };
    }

    if (!email.includes("@") || email.length < 5) {
      return { success: false, message: "Некоректний email" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Пароль має містити мінімум 6 символів",
      };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Паролі не збігаються" };
    }

    // 🔐 Хешування паролю
    const hashedPassword = await hash(password, 10);

    // 🧾 Створення користувача
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // 🪪 Генерація JWT токена
    const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
      expiresIn: "7d",
    });

    // 🍪 Збереження токена в cookie
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
    // ⚠️ Обробка помилки дублікату email
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

    // 🛠️ Загальна помилка сервера
    console.error("Помилка реєстрації:", error);
    return {
      success: false,
      message: "Помилка сервера",
    };
  }
});
