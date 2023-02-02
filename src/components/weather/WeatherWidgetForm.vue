<template>
  <FormSearch />
  <FormAddPoints />
</template>

<script setup lang="ts">
import FormSearch from "@/components/weather/form/FormSearch.vue";
import FormAddPoints from "@/components/weather/form/FormAddPoints.vue";
</script>

<style lang="scss">
.form {
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

  &__error {
    color: var(--vt-c-red);
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
  }
}
</style>
