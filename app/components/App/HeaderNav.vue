<script lang="ts" setup>
import navItems from "@@/data/navitems.json";
</script>

<template>
  <nav>
    <ul class="hidden gap-3 text-theme-dark-grayish-blue sm:flex md:gap-8">
      <li
        v-for="item in navItems"
        :key="item.label"
        class="group relative cursor-pointer text-sm md:text-md"
      >
        <NuxtLink
          :to="item.href"
          class="text-md font-medium text-theme-dark-grayish-blue transition-colors duration-300 ease-in-out group-hover:text-theme-orange"
          :aria-current="useRoute().path === item.href ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          class="absolute top-[calc(100%+20px)] right-0 left-0 h-1 bg-theme-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:top-[calc(100%+35px)]"
        ></span>
      </li>
    </ul>
  </nav>
</template>
