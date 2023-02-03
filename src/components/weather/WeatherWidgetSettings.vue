<template>
  <div class="settings">
    <div @click="toggle" class="settings__icon">
      <SettingsIcon />
    </div>
    <div v-if="show" class="settings__detail">
      <FormSearch />
      <FormAddPoints />
      <WeatherWidgetDropZone />
    </div>
  </div>
</template>

<script setup lang="ts">

import WeatherWidgetDropZone from "./WeatherWidgetDropZone.vue";
import SettingsIcon from "@/components/icons/settingsIcon.vue";
import { ref } from "vue";
import FormAddPoints from "./form/FormAddPoints.vue";
import FormSearch from "./form/FormSearch.vue";

const show = ref(false);

function toggle() {
  console.log("openSettings");
  show.value = !show.value;
}
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;

  &__icon {
    margin-left: auto;
    display: flex;
    cursor: pointer;
    transition: 0.2s opacity ease;
    margin-bottom: 15px;

    @media (hover: hover) {
      &:hover {
        opacity: 0.65;
      }
    }
  }
}
</style>
