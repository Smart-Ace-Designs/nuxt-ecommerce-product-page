<script lang="ts" setup>
import navItems from "@@/data/navitems.json";

defineEmits(["close"]);
</script>

<template>
  <nav aria-label="Main navigation">
    <ul role="list" class="flex flex-col gap-3">
      <li
        v-for="item in navItems"
        :key="item.label"
        class="relative cursor-pointer"
        :aria-current="useRoute().path === item.href ? 'page' : undefined"
      >
        <NuxtLink
          :to="item.href"
          :aria-label="`Navigate to ${item.label} section`"
          @click="$emit('close')"
          class="text-md font-semibold text-theme-very-dark-blue transition-colors duration-300 ease-in-out hover:text-theme-orange"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
