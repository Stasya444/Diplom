<template>
  <div v-if="!photographer" class="min-h-screen flex items-center justify-center bg-black text-white text-xl">
    Завантаження...
  </div>

  <div
    v-else
    class="min-h-screen bg-gradient-to-br from-black to-gray-900 p-10 flex items-center justify-center"
  >
    <div
      class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl max-w-4xl w-full"
    >
    <div v-if="store.userRole == 'admin'" class="flex justify-center items-center">
      <button
          v-if="!photographer.isVerified"
          @click="handleVerifyProfile"
          class="px-6 py-2 flex mb-5 text-white bg-green-300/30 hover:bg-green-300/50 rounded-full border border-green-300/40 shadow-lg transition"
        >
        Верифікувати
        </button>
        <button
          v-if="photographer.isVerified"
          @click="handleDeverifyProfile"
          class="px-6 py-2 flex mb-5 text-white bg-red-300/30 hover:bg-red-300/50 rounded-full border border-red-300/40 shadow-lg transition"
        >
        Деверифікувати
        </button>
    </div>
      <div class="flex mx-auto w-fit gap-2" v-if="isOwn">
        <button
          v-if="!isEditing"
          @click="handleEditProfile"
          class="px-6 py-2 flex mb-5 text-white bg-gray-600/30 hover:bg-gray-600/50 rounded-full border border-gray-400/40 shadow-lg transition"
        >
        Редагувати
        </button>
        <template v-else>
          <button
          @click="handleUpdateProfile"
          class="px-6 py-2 flex mb-5 text-white bg-blue-300/30 hover:bg-blue-300/50 rounded-full border border-blue-300/40 shadow-lg transition"
        >
        Зберегти
        </button>
        <button
          @click="handleEditProfile"
          class="px-6 py-2 flex mb-5 text-white bg-neutral-300/30 hover:bg-neutral-300/50 rounded-full border border-neutral-300/40 shadow-lg transition"
        >
        Відмінити
        </button>
        </template>
      </div>
      <h1 v-if="!isEditing" class="text-3xl font-light text-white mb-2 text-center">
        {{ photographer.name }}
      </h1>
      <input v-else class="text-3xl font-light text-white mb-2 text-center border mx-auto flex" v-model="editForm.name" type="text">
      <div v-if="!photographer.isVerified" class="flex mx-auto mb-4 justify-center w-full">
        <span class="text-red-400 text-sm text-center">Фотограф не верифікований</span>
      </div>

      <!-- Аватар -->
      <div class="flex justify-center mb-6">
        <img :src="photographer.avatar" class="w-36 h-36 rounded-full object-cover border-2 border-white/30 shadow-lg" />
      </div>

      <div class="text-center space-y-2 text-white/80 mb-6">
        <p v-if="!isEditing" class="text-lg italic opacity-80">“{{ photographer.about }}”</p>
        <textarea v-else v-model="editForm.about" class="border px-2 py-1 rounded-lg"></textarea>
        <p v-if="!isEditing">
          📍 {{ photographer.city }} • 🎭 {{ photographer.style }} • 💵
          {{ photographer.price }}₴
        </p>
        <p v-else>
          📍 <input type="text" class="border px-2 py-1 rounded-md" v-model="editForm.city"> • 🎭 <input type="text" class="border px-2 py-1 rounded-md" v-model="editForm.style"> • 💵
          <input type="text" class="border px-2 py-1 rounded-md" v-model="editForm.price">₴
        </p>
      </div>

      <!-- Статистика -->
      <p class="text-sm text-white/60">{{ formatPhotographerStats(photographer.ordersCount, photographer.experience) }}</p>
      <p v-if="photographer.rating" class="text-sm text-white/80 mt-1">⭐ {{ photographer.rating.toFixed(1) }}/5</p>
      <p v-else class="text-sm text-white/40 mt-1 italic">Рейтинг ще не сформовано</p>

      <!-- Фото -->
      <div class="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <img
            v-for="(photo, i) in photographer.photos"
            :key="i"
            :src="photo.url"
            class="rounded-xl object-cover w-full h-40 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md"
            @click="openPhoto(i)"
        />
      </div>

      <div class="mt-8 border-t border-white/10 pt-4">
        <h2 class="text-xl text-white mb-3 font-light">Відгуки</h2>
        <div v-if="photographer.reviews" class="space-y-3">
          <div
            v-for="review in photographer.reviews"
            :key="review.id"
            class="bg-white/10 p-3 rounded-md text-white/80 flex justify-between"
          >
            <div>
              <p class="italic text-sm">“{{ review.comment }}”</p>
              <p class="text-xs text-blue-400 mt-1">Оцінка: {{ review.rating }}/5</p>
            </div>
            <button
                v-if="userRole === 'admin'"
                @click="deleteReview(review.id)"
                class="text-red-400 hover:text-red-600 text-xs transition"
            >
              Видалити
            </button>
          </div>
        </div>
        <p v-else class="text-white/40 italic">Ще немає відгуків</p>

        <!-- Додати відгук -->
        <div v-if="userRole === 'user'" class="mt-6 space-y-3">
          <h3 class="text-white text-sm">Залишити відгук</h3>
          <input
              v-model="newReview.comment"
              placeholder="Ваш коментар"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50"
          />
          <input
              v-model.number="newReview.rating"
              type="number"
              min="1"
              max="5"
              placeholder="Оцінка (1-5)"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50"
          />
          <button
              @click="submitReview"
              class="w-full py-3 bg-blue-600/30 hover:bg-blue-600/50 text-white rounded-xl transition"
          >
            Надіслати
          </button>
        </div>
      </div>

      <!-- Кнопка бронювання -->
      <div class="mt-10 text-center">
        <button
            @click="showBooking = true"
            class="px-6 py-3 bg-blue-600/30 hover:bg-blue-600/50 text-white rounded-full border border-blue-400/40 shadow-lg transition"
        >
          📅 Забронювати
        </button>
      </div>
    </div>
  </div>

  <!-- Модальне вікно бронювання -->
  <div
    v-if="showBooking"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl w-full max-w-md text-black relative">
      <h3 class="text-xl mb-4 text-center font-semibold">Бронювання</h3>

      <input v-model="booking.name" type="text" placeholder="Ваше ім’я" class="w-full mb-3 px-4 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/60" />
      <input v-model="booking.phone" type="tel" placeholder="Номер телефону" class="w-full mb-3 px-4 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/60" />
      <input v-model="booking.date" type="date" class="w-full mb-4 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white" />

      <div class="flex justify-end gap-3">
        <button @click="showBooking = false" class="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition">
          Скасувати
        </button>
        <button @click="submitBooking" class="px-4 py-2 rounded-xl bg-blue-600/40 hover:bg-blue-600/60 text-white transition">
          Підтвердити
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const photographer = ref(null);
const showBooking = ref(false);
const store = useUserStore();
const booking = ref({ name: "", phone: "", date: "" });
const selectedPhotoIndex = ref(null);
const userRole = ref("guest");
const newReview = ref({ comment: "", rating: null });
const isOwn = ref(false);
const isEditing = ref(false);

const editForm = ref({
  name: "",
  about: "",
  city: "",
  style: "",
  price: null,
});

const formatPhotographerStats = (orders, years) => {
  const pluralize = (n, forms) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
      return forms[1];
    return forms[2];
  };
  const orderText = pluralize(orders || 0, [
    "замовлення",
    "замовлення",
    "замовлень",
  ]);
  const yearText = pluralize(years || 0, ["рік", "роки", "років"]);
  return `📷 ${orders || 0} ${orderText} • 💼 ${
    years || 0
  } ${yearText} досвіду`;
};

const submitBooking = async () => {
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...booking.value,
        photographerId: route.params.id,
      }),
    });
    if (res.ok) {
      alert("Запит відправлено!");
      showBooking.value = false;
      booking.value = { name: "", phone: "", date: "" };
    } else {
      alert("Помилка при бронюванні");
    }
  } catch (err) {
    console.error(err);
    alert("Сервер недоступний");
  }
};

const submitReview = async () => {
  try {
    const res = await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newReview.value,
        photographerId: route.params.id,
      }),
    });
    if (res.ok) {
      alert("Відгук надіслано!");
      newReview.value = { comment: "", rating: null };
      location.reload();
    } else {
      alert("Помилка при відправленні відгуку");
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteReview = async (id) => {
  if (!confirm("Ви впевнені, що хочете видалити цей відгук?")) return;
  try {
    const res = await fetch(`/api/rating/${id}`, { method: "DELETE" });
    if (res.ok) {
      location.reload();
    } else {
      alert("Помилка при видаленні відгуку");
    }
  } catch (err) {
    console.error(err);
  }
};

const handleEditProfile = () => {
  isEditing.value = !isEditing.value;
};

const handleUpdateProfile = async () => {
  try {
    const formData = new FormData();
    for(const key in editForm.value) {
      formData.append(key, editForm.value[key]);
    }
    const res = await fetch(`/api/photographers/edit/${route.params.id}`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Помилка при оновленні профілю");
    const data = await res.json();
    if(data.statusCode == 200) {
      photographer.value = data.photographer;
      isEditing.value = false;
    } else {
      throw new Error(data.statusMessage || "Помилка при оновленні профілю");
    }

  } catch (err) {
    alert("Не вдалося оновити профіль");
  }
};

const handleVerifyProfile = async () => {
  if(store.userRole !== 'admin') return;
  try {
    const res = await fetch(`/api/photographers/verify/${route.params.id}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Помилка при верифікації профілю");
    const data = await res.json();
    if(data.status == 200) {
      photographer.value = data.photographer
    } else {
      throw new Error(data.message || "Помилка при верифікації профілю");
    }
  } catch (err) {
    alert(err.message);
  }
};

const handleDeverifyProfile = async () => {
  if(store.userRole !== 'admin') return;
  try {
    const res = await fetch(`/api/photographers/unverify/${route.params.id}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Помилка при деверифікації профілю");
    const data = await res.json();
    if(data.status == 200) {
      photographer.value = data.photographer
    } else {
      throw new Error(data.message || "Помилка при деверифікації профілю");
    }
  } catch (err) {
    alert(err.message);
  }
};

onMounted(async () => {
  try {
    const res = await fetch(`/api/photographers/${route.params.id}`);
    if (!res.ok) throw new Error("Фотограф не знайдений");
    const data = await res.json();
    photographer.value = data.photographer;

    editForm.value = {
      name: photographer.value.name,
      about: photographer.value.about,
      city: photographer.value.city,
      style: photographer.value.style,
      price: photographer.value.price,
    };

    isOwn.value = photographer.value.userId === store.userId;

    // const ratingRes = await fetch(
    //   `/api/rating?photographerId=${route.params.id}`
    // ); 
    // const ratingData = await ratingRes.json();

    // photographer.value = { ...data, reviews: ratingData };

    // const user = await fetch("/api/user");
    // const userData = await user.json();
    // userRole.value = userData?.role || "guest";
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
