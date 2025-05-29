<template>
  <footer
    class="bg-black/50 backdrop-blur-md border-t border-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)]"
  >
    <div
      class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <!-- Контакти -->
      <div class="flex flex-col md:flex-row items-center gap-4 text-sm">
        <a
          href="mailto:support@photofinder.com"
          class="hover:text-gray-200 flex items-center gap-2 transition"
        >
          <Icon name="fa6-solid:envelope" class="w-4 h-4" />
          support@photofinder.com
        </a>
        <a
          href="tel:+380991234567"
          class="hover:text-gray-200 flex items-center gap-2 transition"
        >
          <Icon name="fa6-solid:phone" class="w-4 h-4" />
          +38 (099) 123-45-67
        </a>
      </div>

      <!-- Копірайт -->
      <div class="text-xs text-center md:text-left text-gray-400">
        © 2025 PhotoHub. Всі права захищені.
      </div>

      <!-- Соцмережі -->
      <div class="flex items-center gap-4">
        <a
          href="https://www.instagram.com/nasstia.mkh/?next=%2F"
          target="_blank"
          class="hover:text-gray-200 transition"
        >
          <Icon name="fa6-brands:instagram" class="w-5 h-5" />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61551551923879"
          target="_blank"
          class="hover:text-gray-200 transition"
        >
          <Icon name="fa6-brands:facebook" class="w-5 h-5" />
        </a>
        <a
          href="https://t.me/snastiiaa"
          target="_blank"
          class="hover:text-gray-200 transition"
        >
          <Icon name="fa6-brands:telegram" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
</template>
