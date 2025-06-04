<template>
  <div class="max-w-7xl mx-auto px-6 py-10 text-white">
    <!-- Обкладинка -->
    <div
      class="relative rounded-xl overflow-hidden mb-10 shadow-xl"
      style="height: 350px"
    >
      <img
        src="/img/slide1.jpg"
        alt="Фотографія обкладинки"
        class="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-center"
      >
        <h1 class="text-4xl font-bold mb-4 text-white drop-shadow-lg">
          Обирай свого ідеального фотографа
        </h1>
        <p class="text-lg text-white/80 max-w-2xl">
          Поринь у світ найкращих професіоналів — за стилем, ціною та емоцією.
        </p>
      </div>
    </div>

    <!-- Список фотографів -->
    <PhotographerList :photographers="photographers" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PhotographerList from "~/components/PhotographerList.vue";

const photographers = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("/api/photographers");
    photographers.value = await res.json();
  } catch (err) {
    console.error("Помилка завантаження фотографів:", err);
  }
});
</script>
