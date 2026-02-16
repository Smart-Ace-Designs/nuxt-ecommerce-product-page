<script setup lang="ts">
defineProps<{
  imageList: Image[];
  productName: string;
}>();

const selectedImage = ref<number>(1);
const isOpen = ref<boolean>(false);
</script>

<template>
  <div class="grid sm:gap-3 md:gap-5 lg:gap-7">
    <div class="relative mb-6 sm:mb-0">
      <img
        @click="isOpen = true"
        :src="`/image-product-${selectedImage}.jpg`"
        :alt="`${productName || 'Sneaker Product'} - image ${selectedImage}`"
        :aria-label="`Main product image ${selectedImage} of 4`"
        class="pointer-events-none h-75 w-full object-cover hover:cursor-pointer sm:pointer-events-auto sm:rounded-2xl lg:h-111.25"
      />
      <button
        class="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:fill-theme-orange sm:hidden"
        type="button"
        @click="selectedImage = selectedImage === 1 ? 4 : selectedImage - 1"
        :aria-label="`Previous image (${selectedImage === 1 ? 4 : selectedImage - 1} of 4)`"
      >
        <svg
          width="8"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 18"
          class="stroke-current"
        >
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            stroke-width="4"
            fill="none"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        class="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:fill-theme-orange sm:hidden"
        type="button"
        @click="selectedImage = selectedImage === 4 ? 1 : selectedImage + 1"
        :aria-label="`Next image (${selectedImage === 4 ? 1 : selectedImage + 1} of 4)`"
      >
        <svg
          width="8"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 18"
          class="stroke-current"
        >
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            stroke-width="4"
            fill="none"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <div class="hidden gap-7 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="image in imageList"
        :key="image.id"
        :class="[
          selectedImage === image.id ? 'rounded-xl border-2 border-theme-orange' : '',
          'cursor-pointer sm:mx-auto sm:size-24 md:size-30 lg:size-24',
        ]"
        :aria-current="selectedImage === image.id ? 'true' : undefined"
      >
        <img
          :src="image.thumbnail"
          :alt="image.alt"
          :class="[
            selectedImage === image.id ? 'rounded opacity-30' : 'rounded-xl hover:opacity-30',
            'w-full object-contain transition-opacity duration-200',
          ]"
          @click="selectedImage = image.id"
          :aria-label="`Thumbnail ${image.id} of 4 - ${image.alt}`"
        />
      </div>
    </div>
  </div>

  <div v-if="isOpen" class="fixed inset-0 bg-black/70">
    <AppLightbox @close="isOpen = false" :image-list="imageList" :initial-image="selectedImage" />
  </div>
</template>
