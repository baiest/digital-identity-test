<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import MainLayout from "./components/layouts/MainLayout.vue";
import Intro from "./components/Intro.vue";
import Redirection from "./components/Redirection.vue";
import RequirementsHandler from "./components/RequirementsHandler.vue";
import Geolocation from "./components/steps/Geolocation.vue";

import { storeToRefs } from "pinia";
import { useCameraStore } from "./stores/cameraStore.ts";
import { useLocationStore } from "./stores/locationStore.ts";
import Selfie from "./components/steps/Face/Selfie.vue";

const isEnableOtherDevice = false;
const hasGeolocation = false;
const hasCameraValidation = true;
const shouldShowIntro = ref(!isEnableOtherDevice);
const shouldShowRedirection = ref(isEnableOtherDevice);
const shouldShowStep = ref(false);
const shouldShowRequirements = ref(false);

const cameraStore = storeToRefs(useCameraStore());
const { requestPermission: requestCameraPermission } = useCameraStore();
const { requestPermission: requestLocationPermission } = useLocationStore();

const resetShowViews = () => {
  shouldShowIntro.value = false;
  shouldShowRedirection.value = false;
  shouldShowStep.value = false;
  shouldShowRequirements.value = false;
};

const handleContinue = () => {
  resetShowViews();
  if (hasGeolocation) {
    shouldShowStep.value = true;
    return;
  }

  if (hasCameraValidation && cameraStore.status.value !== "granted") {
    shouldShowRequirements.value = true;
    return;
  }

  shouldShowStep.value = true;
};

const showIntro = () => {
  resetShowViews();
  shouldShowIntro.value = true;
};

const handleRequirementsContinue = () => {
  resetShowViews();
  shouldShowStep.value = true;
};

const showRequirements = () => {
  resetShowViews();
  shouldShowRequirements.value = true;
};

const component = computed(() => {
  if (hasGeolocation) {
    return Geolocation;
  }

  return Selfie;
});

onMounted(() => {
  setTimeout(() => {
    console.log("Change Theme");
  }, 2000);

  if (hasGeolocation) {
    requestLocationPermission();
  }

  if (hasCameraValidation) {
    requestCameraPermission();
  }
});
</script>

<template>
  <section class="flex items-center justify-center bg-orange-900 h-screen">
    <MainLayout>
      <Redirection v-if="shouldShowRedirection" @onContinue="showIntro" />
      <Intro v-if="shouldShowIntro" @onContinue="handleContinue" />
      <RequirementsHandler
        v-if="shouldShowRequirements"
        @onContinue="handleRequirementsContinue"
        @showIntro="showIntro"
      />
      <component v-if="shouldShowStep" :is="component"></component>
    </MainLayout>
  </section>
</template>

<style scoped></style>
