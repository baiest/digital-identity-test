<script setup lang="ts">
import Button from "../shared/Button.vue";
import StepLayout from "../layouts/StepLayout.vue";
import { watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCameraStore } from "../../stores/cameraStore";
import { useLocationStore } from "../../stores/locationStore";

const emits = defineEmits(["showRequirements"]);

const cameraStore = storeToRefs(useCameraStore());
const locationStore = storeToRefs(useLocationStore());
const { getLocation } = useLocationStore();

const onContinue = () => {
  if (locationStore.status.value === "granted") {
    if (!locationStore.location.value) {
      getLocation();
    }

    return;
  }

  emits("showRequirements");
};

watch(locationStore.location, (value) => {
  if (value !== "granted") {
    return;
  }

  if (cameraStore.status.value === "granted") {
    console.log("continue");
  } else {
    emits("showRequirements");
  }
});

onMounted(() => {
  if (locationStore.status.value === "granted") {
    onContinue();
  }
});
</script>
<template>
  <StepLayout>
    <template #main>
      <h3>Geolocation</h3>
      <div v-if="locationStore.location">
        <p>latitud: {{ locationStore.location.value?.coords.latitude }}</p>
        <p>longitud: {{ locationStore.location.value?.coords.longitude }}</p>
      </div>
    </template>
    <template #options>
      <Button @click="onContinue" color="secondary">Get Geo</Button>
    </template>
  </StepLayout>
</template>
