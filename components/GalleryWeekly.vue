<template>
  <section
    class="bg-black/60 backdrop-blur-md py-12 px-4 border-t border-b border-white/10"
  >
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12 text-white">
        Кращі роботи тижня
      </h2>

      <!-- Галерея -->
      <div
        v-if="isLoaded"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="relative group overflow-hidden rounded-lg aspect-square bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <!-- Фото -->
          <img
            :src="photo.url"
            :alt="photo.title"
            class="block w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
          />

          <!-- Текст з'являється при наведенні -->
          <div
            v-if="photo.title"
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <span class="text-white text-lg font-semibold text-center px-2">
              {{ photo.title }}
            </span>
          </div>
        </div>
      </div>

      <!-- Кнопка -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/photographers"
          class="bg-white/10 relative overflow-hidden inline-flex items-center justify-center px-6 py-3 border border-white rounded-md group transition-all duration-300 hover:bg-white/20 shadow hover:shadow-xl"
        >
          <span class="relative z-10 text-white font-medium">
            Дивитись усі роботи
          </span>
          <span
            class="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const photos = ref([]);
const isLoaded = ref(false);

onMounted(async () => {
  try {
    const res = await fetch("/api/featured");
    if (res.ok) {
      photos.value = await res.json();
      isLoaded.value = true;
    } else {
      console.error("Помилка завантаження фото");
    }
  } catch (err) {
    console.error("Помилка при запиті:", err);
  }
});
</script>

<style scoped>
/* Якщо хочеш ще м'якше затемнення — можеш додати кастом */
.group-hover\:brightness-50 {
  transition: filter 0.5s ease;
  filter: brightness(1);
}
.group:hover .group-hover\:brightness-50 {
  filter: brightness(0.5);
}
</style>
