<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__title">Add points</div>
    <div class="form__grid">
      <UiInput placeholder="lon" v-model="lon" :error="lonError" />
      <UiInput placeholder="lat" v-model="lat" :error="latError" />
      <UiButton type="submit">Add</UiButton>
    </div>
    <div class="form__error">
      {{ errorForm }}
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import { ref } from "vue";
import type { AxiosResponse } from "axios";
import type { IWeather } from "@/services/type";
import { weatherServices } from "@/services/weatherServices";
import { useWeatherStore } from "@/stores/useWeatherStore";

const isLoading = ref(false);
const errorForm = ref("");
const { setWeather } = useWeatherStore();
const emit = defineEmits(["submit"]);
const schema = {
  lon: "required|between:-180,180",
  lat: "required|between:-90,90",
};
// Create a form context with the validation schema
const { handleSubmit } = useForm({
  validationSchema: schema,
});
// No need to define rules for fields
const { value: lon, errorMessage: lonError } = useField<string>("lon");
const { value: lat, errorMessage: latError } = useField<string>("lat");

// @ts-ignore
function onInvalidSubmit({ errors }) {
  if (!Object.keys(errors).length) {
    return false;
  }
}
const onSubmit = handleSubmit(async () => {
  try {
    const { data }: AxiosResponse<IWeather> =
      await weatherServices.getWeatherInPoint(lat.value, lon.value);
    setWeather(data);
  } catch (e: any) {
    errorForm.value = e.response?.data.message;
  }
}, onInvalidSubmit);
</script>
