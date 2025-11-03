<script setup lang="ts">
const cartCounter = useState<number>("cartCounter");
const showCart = ref(false);
const showMobileMenu = ref(false);

function toggleCart() {
  showCart.value = !showCart.value;
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}
</script>

<template>
  <header
    class="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-5 sm:mb-12 sm:border-b sm:border-theme-grayish-blue/30 lg:px-0"
  >
    <div class="flex gap-4 md:gap-14">
      <button
        aria-label="Open menu"
        :aria-expanded="showMobileMenu"
        aria-controls="mobile-menu"
        class="hover:cursor-pointer sm:hidden"
        type="button"
        @click="toggleMobileMenu"
      >
        <img src="/icon-menu.svg" alt="Menu" />
      </button>
      <img src="/logo.svg" alt="Sneakers Logo" aria-label="Sneakers Logo" class="h-5" />
      <AppHeaderNav />
    </div>
    <div class="flex items-center gap-5 lg:gap-12">
      <button
        aria-label="View shopping cart"
        aria-haspopup="dialog"
        :aria-expanded="showCart"
        aria-controls="cart-panel"
        class="relative cursor-pointer"
        @click="toggleCart"
        type="button"
      >
        <img src="/icon-cart.svg" alt="Cart" />
        <span
          v-if="cartCounter > 0"
          class="absolute -top-2 -right-2 rounded-full bg-theme-orange px-2 text-[10px] text-white"
          aria-label="Items in cart"
        >
          {{ cartCounter }}
        </span>
      </button>
      <img
        src="/image-avatar.png"
        alt="User avatar"
        class="transition-color size-7 cursor-pointer rounded-full border-2 border-transparent duration-300 hover:border-theme-orange md:size-14"
        aria-label="User profile"
      />
      <div
        v-if="showCart"
        class="absolute top-full left-1/2 z-10 mt-3 -translate-x-1/2 sm:right-2 sm:left-auto sm:-mt-3 sm:translate-x-0 lg:right-0 xl:-right-20"
        id="cart-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <AppCartContents @close="toggleCart" />
      </div>
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 z-10 bg-black/70"
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        aria-label="Mobile navigation menu"
      >
        <AppMobileMenu @close="toggleMobileMenu" />
      </div>
    </div>
  </header>
</template>
