<script setup lang="ts">
import { ref, computed, watch, watchEffect, onMounted } from "vue";
import StepLayaout from "./layouts/StepLayout.vue";
import Button from "./shared/Button.vue";
import { useCameraStore } from "../stores/cameraStore.ts";
import { useLocationStore } from "../stores/locationStore.ts";
import { storeToRefs } from "pinia";

const emits = defineEmits(["onContinue", "showIntro"]);
const cameraStore = storeToRefs(useCameraStore());
const locationStore = storeToRefs(useLocationStore());

const { initCamera } = useCameraStore();
const { setStatus: locationSetStatus, getLocation } = useLocationStore();

const currentSettings = ref<"geolocation" | "camera">("geolocation");
const hasGeolocation = false;
const hasCameraValidation = true;
const permissionsGranted = computed(() => {
  const statuses = [];

  if (hasGeolocation) {
    statuses.push(locationStore.status.value);
  }

  if (hasCameraValidation) {
    statuses.push(cameraStore.status.value);
  }

  return statuses.every((value) => value === "granted");
});

const askGeolocation = () => {
  currentSettings.value = "geolocation";
  getLocation();
};

const askCamera = () => {
  currentSettings.value = "camera";
  initCamera();
};

watch(locationStore.status, (value) => {
  if (value === "granted") {
    askCamera();
  }
});

watchEffect(() => {
  if (permissionsGranted.value) {
    emits("onContinue");
  }
});

const onContinue = () => {
  if (hasGeolocation && locationStore.status.value !== "granted") {
    emits("onContinue");
    return;
  }

  if (hasCameraValidation && cameraStore.status.value !== "granted") {
    emits("showIntro");
  }
};

onMounted(() => {
  if (hasGeolocation && locationStore.status.value !== "granted") {
    askGeolocation();
    return;
  }

  if (cameraStore.status.value !== "granted") {
    askCamera();
  }
});
</script>
<template>
  <StepLayaout>
    <template #main>
      {{ [locationStore.status, cameraStore.status] }} - {{ currentSettings }}
      <div
        v-if="[locationStore.status, cameraStore.status].includes('loading')"
      >
        Cargando Permissions
      </div>
      <div
        v-if="
          currentSettings === 'geolocation' &&
          locationStore.status !== 'granted'
        "
      >
        Geo permissions
      </div>
      <div
        v-if="currentSettings === 'camera' && cameraStore.status !== 'granted'"
      >
        Camera permissions
      </div>
    </template>
    <template #options>
      <Button @click="onContinue"> Reintentar </Button>
    </template>
  </StepLayaout>
</template>
