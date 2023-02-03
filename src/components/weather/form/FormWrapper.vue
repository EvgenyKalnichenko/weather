<template>
  <form class="form" @submit.prevent="emit('submit')">
    <div class="form__title">{{ title }}</div>
    <div class="form__grid">
      <slot />
      <div v-if="isLoading" class="form__loading">
        <UILoader />
      </div>
    </div>
    <div v-if="error" class="form__error">
      {{ error }}
    </div>
  </form>
</template>

<script lang="ts" setup>
import UILoader from '@/components/ui/UILoader.vue';

defineProps<{
  title: string,
  error: string,
  isLoading: boolean
}>();

const emit = defineEmits(['submit'])
</script>

<style lang="scss">
.form {
  margin-bottom: 20px;
  position: relative;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__grid {
    display: flex;
    gap: 15px;
    position: relative;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -8px;
    top: -8px;
    bottom: 8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    background-color: var(--color-background);
    opacity: 0.55;
  }

  &__error {
    color: var(--vt-c-red);
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
  }
}
</style>