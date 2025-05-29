<template>
  <div
    class="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl text-white"
  >
    <h1 class="text-2xl font-bold mb-6 text-center drop-shadow-md">
      Анкета фотографа
    </h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          v-model="form.firstName"
          placeholder="Імʼя"
          required
          class="input-glass"
        />
        <input
          v-model="form.lastName"
          placeholder="Прізвище"
          required
          class="input-glass"
        />
        <input
          v-model="form.city"
          placeholder="Місто"
          required
          class="input-glass"
        />
        <input
          v-model="form.style"
          placeholder="Стиль"
          required
          class="input-glass"
        />
        <input
          v-model.number="form.price"
          type="number"
          placeholder="Ціна (грн)"
          required
          class="input-glass"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="input-glass"
        />
      </div>

      <textarea
        v-model="form.about"
        placeholder="Про себе"
        rows="4"
        required
        class="input-glass w-full"
      />

      <div>
        <label class="block mb-2 text-sm text-white/70">
          Завантажити фото
        </label>
        <input
          type="file"
          multiple
          @change="handleFiles"
          class="input-glass file:px-3 file:py-1 file:rounded-full file:border-0 file:bg-white/20 file:text-white hover:file:bg-white/30"
        />
      </div>

      <div class="flex gap-3 mt-4 items-center flex-wrap">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
        >
          {{ loading ? "Збереження..." : "Додати фотографа" }}
        </button>

        <transition name="fade">
          <div
            v-if="showSuccess"
            class="bg-green-500/10 text-green-300 px-4 py-2 rounded-xl border border-green-500/30 backdrop-blur-md"
          >
            ✅ Успішно збережено!
          </div>
        </transition>

        <span v-if="error" class="text-red-400 font-medium">
          {{ error }}
        </span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  firstName: "",
  lastName: "",
  city: "",
  style: "",
  price: null,
  about: "",
  email: "",
});

const files = ref([]);
const loading = ref(false);
const error = ref("");
const showSuccess = ref(false);

function handleFiles(e) {
  files.value = Array.from(e.target.files);
}

async function handleSubmit() {
  loading.value = true;
  error.value = "";
  showSuccess.value = false;

  // Перевірка унікальності email або імені
  const checkRes = await fetch(
    `/api/check-duplicate?email=${form.value.email}&name=${form.value.firstName}`
  );
  const checkData = await checkRes.json();
  if (!checkRes.ok || checkData.exists) {
    error.value = "Фотограф з таким імʼям або email вже існує";
    loading.value = false;
    return;
  }

  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }
  files.value.forEach((file) => formData.append("photos", file));

  try {
    const res = await fetch("/api/photographers", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);

    form.value = {
      firstName: "",
      lastName: "",
      city: "",
      style: "",
      price: null,
      about: "",
      email: "",
    };
    files.value = [];
  } catch (err) {
    error.value = err.message || "Помилка";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.input-glass {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
}
.input-glass::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.input-glass:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  background-color: #0b0b0b;
  color: #ffffff;
}
</style>
