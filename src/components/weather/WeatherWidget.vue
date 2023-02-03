<template>
  <div class="weather-widget">
    <div class="weather-widget__setting">
      <WeatherWidgetSettings />
    </div>
    <div class="weather-widget__grid">
      <TransitionGroup>
        <WeatherWidgetCard
          v-for="item in store.weatherList"
          :key="item.id"
          :value="item"
        />
      </TransitionGroup>
    </div>
    <div
      v-if="isLoading"
      class="weather-widget__loading"
    >
      <UILoader />
    </div>
    <div class="weather-widget__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherWidgetCard from "./WeatherWidgetCard.vue";
import { useWeatherStore } from "@/stores/useWeatherStore";
import WeatherWidgetSettings from "./WeatherWidgetSettings.vue";
import { ref, watch } from "vue";
import UILoader from "../ui/UILoader.vue";

const store = useWeatherStore();
const error = ref();
const isLoading = ref(false);

if (!store.weatherList.length) {
  isLoading.value = true
  new Promise<{ lat: number; lon: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      // TODO type GeolocationPosition fix eslint
      // @ts-ignore
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        reject(err);
      }
    );
  }).then(async ({ lat, lon }) => {
    console.log("Ваше местоположение", lat, lon);
    store.getGeoLocationWeather(lat, lon).then(data => {
      isLoading.value = false
    }).catch((err) => {
      console.error('Ошибка', err);
      isLoading.value = false;
      error.value = "Error";

    });
  }).catch((err) => {
    isLoading.value = false
    console.error('Ошибка', err);
    error.value = err.message;
  });
} else {
  store.updateStore();
}

watch(
  () => store.weatherList,
  (newVal) => {
    if (newVal.length) {
      error.value = "";
    } else {
      error.value = "Not found";
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.weather-widget {
  padding: 50px 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
  }

  &__loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.24s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
