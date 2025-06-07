import { defineNuxtRouteMiddleware, useCookie, navigateTo } from 'nuxt/app';
import { useUserStore } from '../stores/user'; // Імпорт сховища користувача

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useUserStore(); // Отримання сховища користувача
  const token = useCookie('token').value; // Отримання токена з cookie
  const decodedToken = await $fetch('/api/getuser/bytoken/' + token); // Декодування токена для отримання даних користувача
  if (!store.isLoggedIn && decodedToken) { // Якщо користувач не залогінений і є токен
    try {
      store.logout(); // Вихід з системи, якщо користувач не залогінений
      store.setUser({ // Встановлення користувача в сховище
        id: decodedToken?.id, // Ідентифікатор користувача
        name: decodedToken?.name, // Ім'я користувача
        email: decodedToken?.email, // Email користувача
        role: decodedToken?.role  // Роль користувача
      });
    } catch (error) { // Обробка помилки при встановленні користувача
      console.error('Error setting user:', error); // Логування помилки
    }
    if(store.userRole != 'admin' && to.path.startsWith('/admin')) { // Якщо роль користувача не admin і шлях починається з /admin
      return navigateTo('/'); // Перенаправлення на головну сторінку
    }
  }
});
