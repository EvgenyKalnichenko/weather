<template>
  <div class="drop-zone">
    <div
      v-for="item in store.weatherList"
      :key="item.id"
      :id="`${item.id}`"
      class="drop-zone__item"
    >
      <span
        class="drop-zone__move"
        draggable="true"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop($event, item.id)"
        @dragstart="startDrag($event, item.id)"
      >
        <HamburgerIcon />
      </span>
      {{ item.name }}
      <RemoveIcon
        class="drop-zone__remove"
        @click="store.removeById(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RemoveIcon from "@/components/icons/removeIcon.vue";
import HamburgerIcon from "@/components/icons/hamburgerIcon.vue";
import { useWeatherStore } from "@/stores/useWeatherStore";

const store = useWeatherStore();

function startDrag(evt: any, id: number) {
  console.log("startDrag", id);

  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", id);
}

function onDrop(evt: any, id: number) {
  console.log("onDrop", id);

  const dropItem = store.weatherList.find((el, index) =>
    el.id === id ? index : false
  );
  console.log("dropItem", dropItem);
  let swapItem: number | null = null;
  let onDropItem: number | null = null;
  const itemID = parseInt(evt.dataTransfer.getData("itemID"));
  store.weatherList.forEach(async (el, index) => {
    if (el.id === itemID) swapItem = index;
    if (el.id === id) onDropItem = index;
  });

  if (typeof swapItem === "number" && typeof onDropItem === "number") {
    store.sortWeatherList(onDropItem, swapItem);
  }
}
</script>

<style lang="scss" scoped>
.drop-zone {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item {
    user-select: none;
    display: inline-flex;
    padding: 0;
    background-color: var(--vt-c-text-dark-2);
    padding: 5px;
    border-radius: 5px;
  }

  &__remove {
    cursor: pointer;
    margin-left: auto;
    transition: 0.2s color ease-in-out;

    &:hover {
      color: var(--vt-c-red);
    }
  }

  &__move {
    cursor: move; /* fallback if grab cursor is unsupported */
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    // cursor: grab;
  }
}
</style>
