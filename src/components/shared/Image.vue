<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default:
      "https://thumbs.dreamstime.com/b/cell-phone-icon-vector-illustration-style-flat-iconic-cell-phone-symbol-cell-phone-icon-vector-illustration-style-flat-159424630.jpg"
  }
});
</script>
<template>
  <img
    class="w-auto h-[40%] min-h-[150px] max-h-[250px] object-contain"
    :src="props.src"
    alt=""
  />
</template>
