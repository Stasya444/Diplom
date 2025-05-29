<template>
  <header class="sticky top-0 z-50 border-b border-white/20 shadow-xl">
    <!-- Фон с прозрачностью и размытием -->
    <div
      class="absolute inset-0 backdrop-blur-lg bg-white/10 pointer-events-none"
      aria-hidden="true"
    ></div>

    <!-- Контент хедера -->
    <div
      class="relative container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between"
    >
      <!-- Логотип -->
      <NuxtLink to="/" class="flex items-center flex-shrink-0 z-10">
        <span class="text-xl font-bold text-white">PhotoHub</span>
      </NuxtLink>

      <!-- Навигация -->
      <nav class="hidden md:flex items-center justify-center flex-1 mx-8 z-10">
        <div class="flex space-x-6">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="px-3 py-2 text-sm font-medium text-white hover:text-white whitespace-nowrap transition-all duration-200 relative group"
            active-class="text-white"
          >
            {{ link.title }}
            <span
              class="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Кнопки входу / вітання -->
      <div class="flex items-center space-x-3 z-10">
        <template v-if="auth">
          <span class="text-white text-sm">Привіт, {{ auth.name }}</span>
          <button
            @click="logout"
            class="px-4 py-2 rounded-md border border-white/40 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
          >
            Вийти
          </button>
        </template>

        <template v-else>
          <button
            @click="showAuthModal = true"
            class="hidden md:block px-4 py-2 rounded-md border border-white/40 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
          >
            Увійти
          </button>
        </template>

        <!-- Гамбургер -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-white/70 hover:text-white z-10"
          :class="{ 'text-white': isMenuOpen }"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <!-- Мобільне меню -->
      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/30 p-4 shadow-lg z-40 rounded-b-2xl"
        >
          <div class="flex flex-col space-y-3">
            <NuxtLink
              v-for="link in links"
              :key="link.path"
              :to="link.path"
              @click="isMenuOpen = false"
              class="px-4 py-3 text-sm font-medium text-white hover:bg-white/20 rounded transition"
              active-class="text-white bg-white/20"
            >
              {{ link.title }}
            </NuxtLink>
            <template v-if="!auth">
              <button
                @click="showAuthModal = true"
                class="w-full mt-2 px-4 py-3 rounded-md border border-white/40 text-white text-sm font-medium hover:bg-white/20 transition"
              >
                Увійти
              </button>
            </template>
            <template v-else>
              <div class="text-white text-sm">Привіт, {{ auth.name }}</div>
              <button
                @click="logout"
                class="w-full mt-2 px-4 py-3 rounded-md border border-white/40 bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition"
              >
                Вийти
              </button>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </header>

  <!-- Модальне вікно авторизації -->
  <AuthModal v-model:show="showAuthModal" />
</template>

<script setup>
import { ref, computed } from "vue";
import AuthModal from "~/components/Modalka.vue";

const isMenuOpen = ref(false);
const showAuthModal = ref(false);
const auth = useAuth();

const links = computed(() => {
  const allLinks = [
    { path: "/", title: "ГОЛОВНА" },
    { path: "/photographers", title: "ФОТОГРАФИ" },
  ];

  if (auth.value?.role === "admin") {
    allLinks.push({ path: "/admin", title: "АДМІН ПАНЕЛЬ" });
    allLinks.push({ path: "/add-photographer", title: "ДОДАТИ ФОТОГРАФА" });
  }

  return allLinks;
});

function logout() {
  auth.value = null;
  navigateTo("/");
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
