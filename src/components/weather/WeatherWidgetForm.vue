<template>
    <form class="form-search" @submit.prevent="store.getCityWeather(city)">
      <div class="form-search__title">Add city</div>
      <div class="form-search__grid">
        <UiInput
          placeholder="Add city"
          v-model="city"
        />
        <UiButton>Add</UiButton>
      </div>
    </form>
    <form class="form-search" @submit.prevent="store.getGeoLocationWeather(lat, lon)">
      <div class="form-search__title">Add points</div>
      <div class="form-search__grid">
        <UiInput
          placeholder="lon"
          v-model="lon"
          @input="mask"
        />
        <UiInput
          placeholder="lat"
          v-model="lat"
          @input="mask"
        />
        <UiButton>Add</UiButton>
      </div>
    </form>
</template>

<script setup lang="ts">
import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useWeatherStore } from '@/stores/useWeatherStore';
import { ref } from 'vue';

const city = ref('')
const lon = ref()
const lat = ref()
const store = useWeatherStore()

const mask = (event: Event) => {
  // @ts-ignore
  console.log('mask', event.target.value);
  
}

</script>

<style lang="scss" scoped>
.form-search {
  margin-bottom: 20px;
  
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__grid {
    display: flex;
    gap: 15px;
  }
}
</style>
