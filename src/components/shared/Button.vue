<script setup lang="ts">
import { PropType, computed } from "vue";

const props = defineProps({
  variant: String as PropType<"underline">,
  color: {
    type: String as PropType<"primary" | "secondary">,
    default: "primary"
  }
});

const emits = defineEmits(["click"]);

const styles = computed(() => {
  const defaultStyle =
    "w-full max-w-[400px] transform transition-transform duration-100 active:opacity-95 active:scale-[1.02] rounded-full p-4";

  const optionsColors: { [key: string]: string } = {
    default: "bg-primary",
    secondary: "border-secondary"
  };

  const options: { [key: string]: string | string[] } = {
    default: optionsColors.default,
    underline: ["border-2", optionsColors[props.color]]
  };

  if (
    !props.variant ||
    !Object.keys(options).includes(props.variant) ||
    !Object.keys(optionsColors).includes(props.color)
  ) {
    return [defaultStyle, options["default"]];
  }

  return [defaultStyle, options[props.variant]];
});
</script>
<template>
  <button type="button" :class="styles" @click="emits('click')">
    <slot></slot>
  </button>
</template>
