<script setup lang="ts">
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  }
});
</script>
<template>
  <div class="flex flex-col align-middle h-full">
    <nav v-if="props.showHeader" class="flex justify-between p-2">
      <span>Back</span>
      <div>
        <span>help</span>
        <span>close</span>
      </div>
    </nav>
    <div
      class="flex flex-col items-center h-full p-4 row-span-2 overflow-y-auto bg-background-primary"
    >
      <slot name="main"></slot>
    </div>
    <div
      class="flex flex-col gap-3 items-center py-5 px-10 bg-background-primary"
    >
      <slot name="options"></slot>
    </div>
  </div>
</template>
