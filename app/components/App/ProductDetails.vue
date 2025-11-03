<script setup lang="ts">
const props = defineProps<{
  product?: Product;
}>();

const discountDisplay = computed(() => {
  return props.product?.discount ? `${props.product.discount * 100}%` : "0%";
});

const discountPrice = computed(() => {
  const originalPrice = parseFloat(props.product?.price || "0");
  const discount = props.product?.discount || 0;
  return (originalPrice * (1 - discount)).toFixed(2);
});
</script>

<template>
  <div class="space-y-6" aria-live="polite">
    <h2
      class="mb-3 text-xs font-bold tracking-[.175em] text-theme-dark-grayish-blue uppercase lg:mb-4"
    >
      {{ product?.brand }}
    </h2>
    <h1
      class="text-[1.75rem] leading-8 font-bold text-theme-very-dark-blue md:text-[2.8rem] md:leading-12 lg:mb-10"
    >
      {{ product?.name }}
    </h1>
    <p class="text-md text-theme-dark-grayish-blue sm:text-base">
      {{ product?.description }}
    </p>
    <div class="flex items-center gap-4 sm:flex-col sm:items-start">
      <div class="flex items-center gap-4">
        <span class="text-3xl font-bold text-theme-very-dark-blue">${{ discountPrice }}</span>
        <span
          class="rounded-md bg-theme-very-dark-blue px-3 py-1 text-md font-semibold text-white lg:text-base"
          :aria-hidden="discountDisplay === '0%'"
          >{{ discountDisplay }}</span
        >
      </div>
      <p
        class="ml-auto font-bold text-theme-dark-grayish-blue line-through sm:ml-0"
        :aria-hidden="!product?.discount"
      >
        ${{ product?.price }}
      </p>
    </div>
  </div>
</template>
