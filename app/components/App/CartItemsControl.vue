<script setup lang="ts">
defineProps<{
  productId: number;
}>();

const maxCartItems: number = 10;

const cartIncrementAmount = ref(0);

const cartCounter = useState<number>("cartCounter");
const updateCartCounter = () => {
  cartCounter.value += cartIncrementAmount.value;
};

const cartContents = useState<CartItem[]>("cartContents");
const updateCartContents = (id: number) => {
  if (cartIncrementAmount.value > 0) {
    const existingItem = cartContents.value.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += cartIncrementAmount.value;
    } else {
      cartContents.value.push({ id, quantity: cartIncrementAmount.value });
    }
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row">
    <div
      class="flex w-full items-center justify-between gap-3 rounded-lg bg-theme-light-grayish-blue py-1 lg:w-36"
      role="group"
      aria-label="Quantity selector"
    >
      <button
        class="flex cursor-pointer items-center justify-center p-4"
        type="button"
        @click="cartIncrementAmount > 0 ? cartIncrementAmount-- : null"
        :aria-label="`Decrease quantity to ${cartIncrementAmount - 1}`"
        :aria-disabled="cartIncrementAmount === 0"
        :disabled="cartIncrementAmount === 0"
      >
        <img src="/icon-minus.svg" alt="" />
      </button>
      <span class="font-bold text-theme-very-dark-blue" aria-live="polite">{{
        cartIncrementAmount
      }}</span>
      <button
        class="flex cursor-pointer items-center justify-center p-4"
        type="button"
        @click="cartIncrementAmount++"
        :aria-label="`Increase quantity to ${cartIncrementAmount + 1}`"
        :aria-disabled="cartIncrementAmount >= maxCartItems"
        :disabled="cartIncrementAmount >= maxCartItems"
      >
        <img src="/icon-plus.svg" alt="" />
      </button>
    </div>
    <button
      type="button"
      @click="
        updateCartCounter();
        updateCartContents(productId);
        cartIncrementAmount = 0;
      "
      :disabled="cartIncrementAmount === 0"
      :class="[
        cartIncrementAmount === 0
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:bg-theme-orange/80',
        'flex items-center justify-center gap-4 rounded-lg bg-theme-orange px-4 py-4 font-black text-theme-very-dark-blue transition-colors duration-200 text-shadow-theme-very-dark-blue lg:px-20',
      ]"
      :aria-label="`Add ${cartIncrementAmount} item${cartIncrementAmount !== 1 ? 's' : ''} to cart`"
      :aria-disabled="cartIncrementAmount === 0"
    >
      <svg
        class="size-4 fill-theme-very-dark-blue"
        viewBox="0 0 22 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
          fill="currentColor"
          fill-rule="nonzero"
        ></path>
      </svg>
      Add to cart
    </button>
  </div>
</template>
