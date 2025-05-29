<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Заголовок с анимацией -->
      <div
        class="mb-16 p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg"
        data-aos="fade-down"
      >
        <h1
          class="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
        >
          Відгуки клієнтів
        </h1>
        <p class="text-center text-white/70 text-lg">
          Наші історії у світлинах та словах ✨
        </p>
      </div>

      <!-- Сетка отзывов -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(review, index) in reviews"
          :key="review.id"
          class="p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/15 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-aos-delay="index * 100"
        >
          <!-- Аватар и информация -->
          <div class="flex items-center mb-6 gap-4">
            <div class="relative">
              <img
                :src="review.photographer?.avatar || placeholder"
                class="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
                alt="Фотограф"
              />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
              >
                <span class="text-black text-xs font-bold">{{
                  review.value
                }}</span>
              </div>
            </div>
            <div>
              <p class="text-xl font-medium text-white">
                {{ review.photographer?.name || "Анонімний фотограф" }}
              </p>
              <p class="text-sm text-white/60">
                {{ review.photographer?.specialty || "Фотограф" }}
              </p>
            </div>
          </div>

          <!-- Текст отзыва -->
          <div class="relative mb-6">
            <div
              class="absolute top-0 left-0 text-6xl text-white/10 font-serif"
            >
              "
            </div>
            <p class="text-white/90 pl-8 pt-4 text-lg italic">
              {{ review.comment }}
            </p>
            <div
              class="absolute bottom-0 right-0 text-6xl text-white/10 font-serif"
            >
              "
            </div>
          </div>

          <!-- Рейтинг -->
          <div class="flex justify-between items-center">
            <div class="flex space-x-1">
              <span v-for="i in 5" :key="i" class="text-xl">
                {{ i <= review.value ? "★" : "☆" }}
              </span>
            </div>
            <span class="text-xs text-white/50">
              {{ formatDate(review.date) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Пустой state -->
      <div v-if="reviews.length === 0" class="text-center py-16">
        <div
          class="inline-block p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10"
        >
          <p class="text-xl text-white/70 mb-4">Ще немає відгуків</p>
          <button
            class="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
          >
            Залишити відгук
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const reviews = ref([
  {
    id: 1,
    comment:
      "Неймовірна робота! Фотограф зумів передати саму суть моменту. Дуже професійно та з душею.",
    value: 5,
    date: "2023-10-15",
    photographer: {
      name: "Олександр Коваль",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      specialty: "Fashion фотограф",
    },
  },
  {
    id: 2,
    comment:
      "Дуже задоволений результатом. Всі фото вийшли природними та емоційними. Рекомендую!",
    value: 4,
    date: "2023-09-28",
    photographer: {
      name: "Марія Петренко",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      specialty: "Портретний фотограф",
    },
  },
  {
    id: 3,
    comment:
      "Це був чудовий досвід. Фотограф знайшов ідеальні ракурси та світло. Дуже вдячна за такі якісні фото!",
    value: 5,
    date: "2023-11-02",
    photographer: {
      name: "Ірина Шевченко",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      specialty: "Студійний фотограф",
    },
  },
]);

const placeholder = "https://via.placeholder.com/150/333333/FFFFFF?text=PH";

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });
});

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};
</script>

<style>
/* Дополнительные стили для плавности */
html {
  scroll-behavior: smooth;
}
body {
  font-family: "Inter", sans-serif;
  background-color: #000;
}
</style>
