<script setup lang="ts">
import productDetails from "@@/data/products.json";

const cartContents = useState<CartItem[]>("cartContents");
const cartCounter = useState<number>("cartCounter");
const emptyCart = () => {
  cartContents.value = [];
  cartCounter.value = 0;
  emit("close");
};

const product = (id: number) => productDetails.find((p) => p.id === id) as Product | undefined;
const discountPrice = (item: CartItem) => {
  const productItem = product(item.id);
  if (!productItem) return "0.00";
  const originalPrice = parseFloat(productItem.price);
  const discount = productItem.discount || 0;
  return (originalPrice * (1 - discount)).toFixed(2);
};
const totalPrice = (item: CartItem) => {
  const price = discountPrice(item);
  return (parseFloat(price) * item.quantity).toFixed(2);
};

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    class="w-[360px] rounded-xl bg-white pt-4 pb-8 shadow-xl"
    role="dialog"
    aria-label="Shopping Cart"
    tabindex="-1"
  >
    <h2 class="mb-7 px-6 font-bold text-theme-very-dark-blue">Cart</h2>
    <hr class="mb-6 border-theme-grayish-blue/30" />
    <div
      v-if="cartContents.length === 0"
      class="px-6 py-16 text-center font-semibold text-theme-dark-grayish-blue"
      aria-label="Your shopping cart is currently empty"
    >
      Your cart is empty.
    </div>
    <div v-else class="flex flex-col gap-6 px-5" aria-live="polite">
      <div class="flex items-center gap-4" v-for="item in cartContents" :key="item.id">
        <img
          :src="product(item.id)?.images[0]?.thumbnail"
          :alt="product(item.id)?.name"
          class="size-13 rounded"
        />
        <div class="flex-1">
          <p class="text-theme-dark-grayish-blue">{{ product(item.id)?.name }}</p>
          <div class="flex items-center gap-1 text-theme-grayish-blue">
            <span class="text-theme-dark-grayish-blue">${{ discountPrice(item) }}</span>
            <span class="text-theme-dark-grayish-blue">x</span>
            <span
              class="text-theme-dark-grayish-blue"
              :aria-label="`Quantity of ${product(item.id)?.name}: {{ item.quantity }}`"
              >{{ item.quantity }}</span
            >
            <span class="ml-2 font-bold text-theme-very-dark-blue">${{ totalPrice(item) }}</span>
          </div>
        </div>
        <button
          class="cursor-pointer p-1 transition hover:opacity-70"
          type="button"
          @click="emptyCart"
          :aria-label="`Remove ${product(item.id)?.name} from cart`"
        >
          <img src="/icon-delete.svg" alt="Remove from cart" />
        </button>
      </div>
      <button
        class="w-full rounded-lg bg-theme-orange py-4 font-bold transition text-shadow-theme-very-dark-blue hover:bg-orange-400"
        type="button"
        @click="emptyCart"
        :aria-label="`Proceed to checkout (${cartContents.length} item${cartContents.length !== 1 ? 's' : ''})`"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
