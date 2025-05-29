<template>
  <form @submit.prevent="submit">
    <div class="grid gap-2 mb-4 text-black">
      <select v-model="value" class="border px-4 py-2 rounded">
        <option value="">Оберіть оцінку</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
      </select>
      <textarea
        v-model="comment"
        placeholder="Залиште коментар"
        class="border px-4 py-2 rounded"
      />
    </div>
    <button
      type="submit"
      class="bg-[#928c81] text-white py-2 px-4 rounded hover:bg-[#747067]"
    >
      Надіслати відгук
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({ photographerId: Number });

const value = ref("");
const comment = ref("");

const submit = async () => {
  if (!value.value) return alert("Оцініть від 1 до 5");
  await fetch("/api/ratings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: value.value,
      comment: comment.value,
      photographerId: props.photographerId,
    }),
  });
  alert("Відгук додано!");
  value.value = "";
  comment.value = "";
};
</script>
