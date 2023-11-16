<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCameraStore } from "../../../stores/cameraStore";
import { storeToRefs } from "pinia";

const { stream, videoElement } = storeToRefs(useCameraStore());
const { initCamera } = useCameraStore();
const videoRef = ref<HTMLVideoElement | null>(null);
onMounted(() => {
  if (!stream.value) {
    initCamera();
  }

  if (videoRef.value) {
    videoElement.value = videoRef.value;
  }
});
</script>
<template>
  <div class="relative h-full grid content-center overflow-hidden">
    <span class="absolute place-self-center">Loading Cam...</span>
    <video
      ref="videoRef"
      class="absolute w-[101%] h-[101%] object-cover -scale-x-100"
    ></video>
  </div>
</template>
