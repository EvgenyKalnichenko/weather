<template>
  <FormWrapper
    title="Add points"
    :error="errorForm"
    :is-loading="isLoading"
    @submit="onSubmit"
  >
    <UiInput placeholder="lon" v-model="lon" :error="lonError" />
    <UiInput placeholder="lat" v-model="lat" :error="latError" />
    <UiButton type="submit">Add</UiButton>
  </FormWrapper>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import FormWrapper from "@/components/weather/form/FormWrapper.vue";
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
  isLoading.value = true
  try {
    const { data }: AxiosResponse<IWeather> = await weatherServices.getWeatherInPoint(lat.value, lon.value);
    isLoading.value = false
    setWeather(data);
  } catch (e: any) {
    isLoading.value = false
    errorForm.value = e.response?.data.message;
  }
}, onInvalidSubmit);
</script>
