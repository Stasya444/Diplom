<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[70]"
    @click.self="close"
  >
    <div
      class="bg-white/20 backdrop-blur-lg border border-white/40 rounded-3xl shadow-lg relative max-w-md w-full p-8"
    >
      <button
        @click="close"
        class="absolute top-4 right-4 p-1 text-white/70 hover:text-white transition-transform hover:rotate-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="flex flex-col items-center mb-6">
        <div
          class="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white/90">
          {{ isLogin ? "Увійти" : "Реєстрація" }}
        </h2>
      </div>

      <!-- Перемикач -->
      <div
        class="flex bg-white/20 backdrop-blur-sm p-1 rounded-full mb-6 border border-white/40"
      >
        <button
          @click="isLogin = true"
          class="flex-1 py-2 rounded-full transition"
          :class="
            isLogin
              ? 'bg-white/40 text-white shadow-sm'
              : 'text-white/70 hover:text-white'
          "
        >
          Увійти
        </button>
        <button
          @click="isLogin = false"
          class="flex-1 py-2 rounded-full transition"
          :class="
            !isLogin
              ? 'bg-white/40 text-white shadow-sm'
              : 'text-white/70 hover:text-white'
          "
        >
          Реєстрація
        </button>
      </div>

      <!-- Форма -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Імʼя -->
        <div v-if="!isLogin">
          <input
            v-model="form.name"
            type="text"
            placeholder="Ім'я"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <!-- Email -->
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <div>
          <input
            v-model="form.phone"
            type="number"
            placeholder="Номер телефону"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <!-- Пароль -->
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Пароль"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <!-- Підтвердження пароля -->
        <div v-if="!isLogin">
          <input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Повторіть пароль"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <!-- Вибір ролі -->
        <div v-if="!isLogin">
          <select
            v-model="form.role"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option disabled value="">Оберіть роль</option>
            <option value="guest">Гість</option>
            <option value="photographer">Фотограф</option>
          </select>
        </div>

        <!-- Кнопка -->
        <button
          type="submit"
          class="w-full py-3 bg-white/40 hover:bg-white/50 text-white font-medium rounded-xl transition"
        >
          {{ isLogin ? "Увійти" : "Зареєструватись" }}
        </button>
      </form>

      <!-- Повідомлення -->
      <p v-if="message" class="text-center text-red-400 mt-4">{{ message }}</p>

      <!-- Нижній перемикач -->
      <p class="text-center mt-6 text-white/80">
        {{ isLogin ? "Немає акаунту?" : "Вже зареєстровані?" }}
        <button
          @click="isLogin = !isLogin"
          class="text-white/90 hover:underline ml-1 font-medium"
        >
          {{ isLogin ? "Зареєструватися" : "Увійти" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const show = defineModel("show");
const isLogin = ref(true);
const message = ref("");
const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
});

function close() {
  show.value = false;
  form.value = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
  message.value = "";
}

import { useAuth } from "~/composables/useAuth";
const auth = useAuth();

async function handleSubmit() {
  message.value = "";

  if (!form.value.email || !form.value.password) {
    message.value = "Email і пароль обов’язкові";
    return;
  }

  if (!isLogin.value) {
    if (!form.value.name || !form.value.confirmPassword || !form.value.role) {
      message.value = "Заповніть усі поля";
      return;
    }

    if (form.value.password.length < 6) {
      message.value = "Пароль має бути не менше 6 символів";
      return;
    }

    if (form.value.password !== form.value.confirmPassword) {
      message.value = "Паролі не співпадають";
      return;
    }
  }

  const endpoint = isLogin.value ? "/api/login" : "/api/register";

  try {
    const res = await $fetch(endpoint, {
      method: "POST",
      body: form.value,
    });

    if (res.success) {
      auth.value = res.user; // ← це головне!
      close();
    } else {
      message.value = res.message || "Сталася помилка";
    }
  } catch (err) {
    message.value = "Помилка сервера";
  }
}
</script>
