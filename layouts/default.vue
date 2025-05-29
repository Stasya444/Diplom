<template>
  <div class="min-h-screen flex flex-col bg-neutral-900 text-white">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>
