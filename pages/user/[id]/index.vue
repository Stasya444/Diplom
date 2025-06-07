<template>
  <div
    v-if="!user"
    class="min-h-screen flex items-center justify-center bg-black text-white text-xl"
  >
    Завантаження...
  </div>

  <div
    v-else
    class="min-h-screen bg-gradient-to-br from-black to-gray-900 p-10 flex items-center justify-center"
  >
    <div
      class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl max-w-4xl w-full"
    >
      <h1 class="text-3xl font-light text-white mb-4 text-center">
        {{ user.name }}
      </h1>

      <div class="flex justify-center mb-6">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="w-36 h-36 rounded-full object-cover border-2 border-blue-500/30 shadow-lg grayscale"
        />
      </div>

      <div class="text-center space-y-2 text-white/80 mb-6 flex flex-col">
        <p class="text-lg">{{ user.role == "guest" ? "" : user.role == "photographer" ? "Фотограф" : "Адміністратор" }}</p>
        <p v-if="photographer" class="text-lg">{{ photographer.name }}</p>
        <p v-if="photographer" class="text-lg">Ціна: {{ photographer.price }} грн</p>
        <LazyNuxtLink v-if="user.role == 'photographer' && photographer" :to="'/photographers/'+photographer.id" class="text-gray-400 hover:text-white duration-200">Перейти до профілю фотографа</LazyNuxtLink>
        <button @click="isCreatingPhotographer = true" v-if="user.id == store.userId && !photographer" to="/" class="text-gray-400 hover:text-white duration-200">Створити профіль фотографа</button>
      </div>
    </div>

    <div on:ou class="w-160 h-fit rounded-2xl bg-neutral-500/60 backdrop-blur-md absolute" v-if="user.id == store.userId && !photographer && isCreatingPhotographer">
        <!-- <div class="flex flex-col px-3 py-1 gap-1">
            <h1 class="text-3xl font-bold text-center mb-10 mt-2">Створення аккаунту фотографа</h1>

            <div class="flex flex-col">
                <label for="firstname">Ім'я</label>
                <input id="firstname" type="text" class="w-full mb-3 px-4 py-2 border rounded" placeholder="Ім'я">
            </div>
            <div class="flex flex-col">
                <label for="lastname">Прізвище</label>
                <input id="lastname" type="text" class="w-full mb-3 px-4 py-2 border rounded" placeholder="Прізвище">
            </div>
            <div class="flex flex-col">
                <label for="city">Місто</label>
                <input id="city" type="text" class="w-full mb-3 px-4 py-2 border rounded" placeholder="Місто">
            </div>
    
            <div class="flex flex-col">
                <label for="style">Стиль</label>
                <input id="style" type="text" class="w-full mb-3 px-4 py-2 border rounded" placeholder="Стиль">
            </div>
            <div class="flex flex-col">
                <label for="price">Ціна</label>
                <input id="price" type="number" class="w-full mb-3 px-4 py-2 border rounded" placeholder="1000 грн">
            </div>
            <div class="flex flex-col">
                <label for="bio">Опис</label>
                <textarea id="bio" type="text" class="no-resize w-full mb-3 px-4 py-2 border rounded" placeholder="Опис"></textarea>
            </div>
            
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2">Створити</button>
        </div> -->
        <AddPhotographerForm :userId="user.id" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useUserStore } from "../../../stores/user";
import AddPhotographerForm from "../../../components/AddPhotographerForm.vue";

const route = useRoute();
const user = ref(null);
const store = useUserStore();
const photographer = ref(null);
const isCreatingPhotographer = ref(false);



onMounted(async () => {
  try {
    const res = await fetch(`/api/getuser/${route.params.id}`);
    if (!res.ok) throw new Error("Користувач не знайдений");
    const data = await res.json();
    user.value = data.user;
    const response = await fetch(`/api/photographers/byuser/${route.params.id}`);
    if (!response.ok) throw new Error("Профіль фотографа не знайдено");
    const d = await response.json();
    if(d.photographer)
        photographer.value = d.photographer;
    else photographer.value = null;
  } catch (err) {
    console.error(err);
  }
});
</script>

<style>
body {
  font-family: "Inter", sans-serif;
}
</style>
