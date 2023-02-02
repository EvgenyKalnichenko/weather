<template>
  <div class="card-weather">
    <div v-if="value.name" class="card-weather__top">
      {{ value.name }}, {{ value.sys.country }}
    </div>
    <div v-else class="card-weather__top">{{ value.coord }}</div>
    <div class="card-weather__main">
      <img
        :src="`http://openweathermap.org/img/w/${value.weather[0].icon}.png`"
        :alt="value.weather[0].description"
      />
      <div class="card-weather__temperature">{{ value.main.temp }} °C</div>
    </div>
    <div class="card-weather__row">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="34px" height="34px" viewBox="0 0 14 14">
          <path d="m 7,8.8385971 c -1.1946,-0.3988 -1.944,-0.4259 -2.39275,-0.086 C 4.1109,9.1274971 4,9.0840971 4,8.5145971 c 0,-1.0579 0.98405,-1.2801 3.15745,-0.7131 1.40955,0.3678 1.62595,0.3844 2.0757,0.1596 0.2762,-0.138 0.5617,-0.2799 0.6345,-0.3154 0.0728,-0.035 0.13235,0.1783 0.13235,0.4751 0,0.4191 -0.1163,0.5998 -0.52065,0.8088 -0.65705,0.3398 -1.2548,0.3179 -2.47935,-0.091 z m 0,-2.647 c -1.1946,-0.3989 -1.944,-0.426 -2.39275,-0.087 C 4.1109,6.4803971 4,6.4370971 4,5.8674971 c 0,-1.0307 1.1159,-1.3118 2.9706,-0.7485 1.45335,0.4415 1.9587,0.4654 2.42215,0.1149 0.4989,-0.3774 0.60725,-0.3319 0.60725,0.2546 0,0.4027 -0.12115,0.5875 -0.52065,0.7941 -0.65705,0.3397 -1.2548,0.3178 -2.47935,-0.091 z"/>
        </svg> -->
      Feels like: {{ value.main.feels_like }}°C,
      {{ value.weather[0].description }}
    </div>
    <div class="card-weather__grid">
      <div class="card-weather__grid-item">
        <PressureIcon />{{ value.main.pressure }} hPa
      </div>
      <div class="card-weather__grid-item">
        <WindIcon /> {{ value.wind.speed }} m/s
      </div>
      <div class="card-weather__grid-item">
        <HumibityIcon /> {{ value.main.humidity }} %
      </div>
      <div class="card-weather__grid-item">
        <EyeIcon /> {{ value.visibility }} m
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IWeather } from "@/services/type";
import PressureIcon from "@/components/icons/pressureIcon.vue";
import WindIcon from "@/components/icons/windIcon.vue";
import HumibityIcon from "@/components/icons/humidityIcon.vue";
import EyeIcon from "@/components/icons/eyeIcon.vue";

defineProps<{
  value: IWeather;
}>();
</script>

<style lang="scss" scoped>
.card-weather {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 21px 0 var(--color-border);

  .center {
    display: flex;
    align-items: center;
  }

  &__row {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__top {
    font-weight: bold;
  }

  &__main {
    display: flex;
    margin: 15px 0;

    gap: 15px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    &-item {
      display: inline-flex;
      align-items: center;

      svg {
        margin-right: 5px;
      }
    }
  }

  &__temperature {
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
