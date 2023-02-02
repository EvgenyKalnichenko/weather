<template>
  <WeatherWidget />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import WeatherWidget from './components/weather/WeatherWidget.vue';
onMounted(() => {{
  const color_scheme = localStorage.getItem("color-scheme") || 'dark';

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
					localStorage.setItem("color-scheme", "light");
				} else {
					localStorage.setItem("color-scheme", "dark");
				}

        document.documentElement.setAttribute("data-color-scheme", color_scheme);
}})
</script>

<style scoped>

</style>
