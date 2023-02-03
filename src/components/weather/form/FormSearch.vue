<template>
  <FormWrapper
    title="Add city"
    :error="errorFormCity"
    :is-loading="isLoading"
    @submit="onSubmit"
  >
    <UiInput placeholder="Add city" v-model="city" :error="cityError" />
    <UiButton type="submit">Add</UiButton>
  </FormWrapper>
</template>

<script lang="ts" setup>

import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import { useWeatherStore } from "@/stores/useWeatherStore";
import type { AxiosResponse } from "axios";
import type { IWeather } from "@/services/type";
import { weatherServices } from "@/services/weatherServices";
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import FormWrapper from "@/components/weather/form/FormWrapper.vue";

const isLoading = ref(false);
const errorFormCity = ref("");
const { setWeather } = useWeatherStore();

const schema = {
  city: "required|min:2",
};
// Create a form context with the validation schema
const { handleSubmit } = useForm({
  validationSchema: schema,
});
// No need to define rules for fields
const { value: city, errorMessage: cityError } = useField<string>("city");
// @ts-ignore
function onInvalidSubmit({ errors }) {
  console.log("onInvalidSubmit !!!!!!", errors);
  if (!Object.keys(errors).length) {
    return false;
  }
}
const onSubmit = handleSubmit(async () => {
  console.log("handleSubmit !!!!!!");
  isLoading.value = true
  try {
    const { data }: AxiosResponse<IWeather> =
    await weatherServices.getCityWeather(city.value);
    setWeather(data);
    isLoading.value = false
  } catch (e: any) {
    errorFormCity.value = e.response?.data.message;
    isLoading.value = false
  }
}, onInvalidSubmit);
</script>
