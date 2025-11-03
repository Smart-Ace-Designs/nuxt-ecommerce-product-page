<script setup lang="ts">
const props = defineProps<{
  imageList: Image[];
  initialImage: number;
}>();

defineEmits(["close"]);

const selectedImage = ref<number>(props.initialImage || 1);
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center gap-10"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    aria-live="polite"
  >
    <div class="relative">
      <svg
        class="absolute -top-12 right-0 size-6 cursor-pointer fill-current text-theme-white transition-colors delay-200 hover:text-theme-orange"
        @click="$emit('close')"
        role="button"
        aria-label="Close gallery"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 15"
      >
        <path
          d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
          fill-rule="evenodd"
        />
      </svg>
      <img
        :src="`/image-product-${selectedImage}.jpg`"
        :alt="`Fall limited edition sneakers - image ${selectedImage}`"
        class="size-128 rounded-2xl object-cover"
      />

      <button
        class="absolute top-1/2 -left-6 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-colors delay-200 hover:text-theme-orange"
        type="button"
        @click="selectedImage = selectedImage === 1 ? 4 : selectedImage - 1"
        :aria-label="`Go to image ${selectedImage === 1 ? 4 : selectedImage - 1} of 4`"
        :aria-pressed="selectedImage === 1 ? false : true"
      >
        <svg class="size-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 18">
          <path d="M11 1 3 9l8 8" stroke-width="2" fill="none" fill-rule="evenodd" />
        </svg>
      </button>

      <button
        class="absolute top-1/2 -right-6 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-colors delay-200 hover:text-theme-orange"
        type="button"
        @click="selectedImage = selectedImage === 4 ? 1 : selectedImage + 1"
        :aria-label="`Go to image ${selectedImage === 4 ? 1 : selectedImage + 1} of 4`"
        :aria-pressed="selectedImage === 4 ? false : true"
      >
        <svg class="size-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 18">
          <path d="m2 1 8 8-8 8" stroke-width="2" fill="none" fill-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-4 gap-6 px-8">
      <div
        v-for="image in imageList"
        :key="image.id"
        class="cursor-pointer"
        role="button"
        tabindex="0"
      >
        <div
          class="relative size-20 overflow-hidden rounded-xl"
          :class="selectedImage === image.id ? 'border-2 border-theme-orange' : ''"
          @click="selectedImage = image.id"
          :aria-current="selectedImage === image.id ? 'true' : undefined"
        >
          <img
            :src="image.thumbnail"
            :alt="image.alt"
            class="h-full w-full object-cover transition-opacity duration-200"
            :aria-label="`Thumbnail ${image.id} of 4 - ${image.alt}`"
          />
          <div v-if="selectedImage === image.id" class="absolute inset-0 bg-black/40"></div>
        </div>
      </div>
    </div>
  </div>
</template>
