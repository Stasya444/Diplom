<template>
  <div
    class="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl text-white shadow-xl p-6 transition duration-300 hover:shadow-2xl hover:scale-[1.015]"
  >
    <!-- Аватар и имя -->
    <div class="flex items-center gap-4 mb-6">
      <img
        :src="photographer.avatar || placeholder"
        alt="Аватар"
        class="w-20 h-20 rounded-full object-cover border border-white/20 shadow-md transition duration-300"
      />
      <div>
        <h2 class="text-2xl font-bold">{{ photographer.name }}</h2>
        <p class="text-sm text-white/60">
          {{ photographer.city || "Місто не вказано" }}
        </p>
      </div>
    </div>

    <!-- Галерея -->
    <div class="grid grid-cols-3 gap-3 mb-5">
      <img
        v-for="photo in photographer.photos.slice(0, 3)"
        :key="photo.id"
        :src="photo.url"
        alt="Фото"
        class="w-full h-28 object-cover rounded-lg border border-white/10 hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Инфо -->
    <div class="flex flex-wrap justify-between text-sm text-white/70 mb-4">
      <span>📆 {{ photographer.experience || 0 }} років досвіду</span>
      <span>📸 {{ photographer.ordersCount || 0 }} замовлень</span>
    </div>

    <!-- Описание -->
    <p class="text-sm text-white/80 mb-5">
      {{ photographer.about || "Опис не вказано" }}
    </p>

    <!-- Цена -->
    <div class="flex justify-between items-center mb-6">
      <span class="text-lg font-semibold text-white">
        {{ photographer.price }} ₴ / год
      </span>
      <NuxtLink
        :to="`/photographers/${photographer.id}`"
        class="text-sm underline hover:text-white/90 transition"
      >
        Перейти до профілю →
      </NuxtLink>
    </div>

    <!-- Кнопки действий -->
    <div class="grid sm:grid-cols-3 gap-3 mb-4">
      <button
        class="bg-[#a8996e] hover:bg-[#8a7d56] text-white py-2 rounded-xl text-sm font-medium transition-all"
      >
        📞 Дзвінок
      </button>
      <button
        class="bg-white text-[#595246] border border-[#a8996e] hover:bg-[#f7f5f0] py-2 rounded-xl text-sm font-medium transition-all"
      >
        💬 WhatsApp
      </button>
      <button
        class="bg-[#595246] hover:bg-[#3e3a2f] text-white py-2 rounded-xl text-sm font-medium transition-all"
      >
        💌 Надіслати запит
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  photographer: {
    type: Object,
    required: true,
  },
});

const placeholder = "https://via.placeholder.com/80";
</script>
