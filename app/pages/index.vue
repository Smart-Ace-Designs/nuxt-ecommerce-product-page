<script setup lang="ts">
import productDetails from "@@/data/products.json";

const productId = 1;
const product = computed(() => productDetails.find((p) => p.id === productId)) as ComputedRef<
  Product | undefined
>;
const images = computed(() => product.value?.images ?? []);
</script>

<template>
  <main>
    <section
      class="mx-auto max-w-5xl sm:mt-11 sm:grid sm:grid-cols-2 sm:gap-8 sm:px-10 md:mt-22 md:gap-16 lg:gap-32"
      aria-label="Product showcase"
    >
      <AppProductGallery :imageList="images" :productName="product?.name!" />
      <div class="my-auto flex flex-col gap-6 px-6 md:px-0 lg:gap-7">
        <AppProductDetails :product="product" />
        <AppCartItemsControl :productId="productId" />
      </div>
    </section>
  </main>
</template>
