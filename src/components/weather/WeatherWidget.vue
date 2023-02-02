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

const store = useWeatherStore();
const error = ref();

if (!store.weatherList.length) {
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
  })
    .then(({ lat, lon }) => {
      console.log("Ваше местоположение", lat, lon);
      store.getGeoLocationWeather(lat, lon);
    })
    .catch((err) => {
      error.value = err.message;
    });
} else {
  store.updateStore();
}

watch(() => store.weatherList, (newVal, oldVal) => {
  if(newVal.length) {
    error.value = ''
  } else {
    error.value = 'Not found'
  }
}, { deep: true })
</script>

<style lang="scss" scoped>
.weather-widget {
  padding: 50px 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
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
