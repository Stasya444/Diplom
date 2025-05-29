<template>
  <div class="min-h-screen bg-black text-white p-10">
    <h1 class="text-3xl font-bold mb-6">Профіль фотографа</h1>
    <div v-if="photographer">
      <p><strong>Імʼя:</strong> {{ photographer.firstName }}</p>
      <p><strong>Місто:</strong> {{ photographer.city }}</p>
      <p><strong>Стиль:</strong> {{ photographer.style }}</p>
      <p><strong>Ціна:</strong> {{ photographer.price }} ₴</p>
    </div>
    <div v-else>Завантаження...</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const photographer = ref(null);

onMounted(async () => {
  const res = await fetch(`/api/photographers/${route.params.id}`);
  const data = await res.json();
  photographer.value = data;
});
</script>
