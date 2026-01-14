<script setup lang="ts">
useState("cartCounter", () => 0);
useState("cartContents", (): CartItem[] => []);
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
