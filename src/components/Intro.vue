<script setup lang="ts">
import StepLayaout from "../components/layouts/StepLayout.vue";
import Button from "../components/shared/Button.vue";
import Image from "./shared/Image.vue";

const emits = defineEmits(["onContinue"]);
</script>
<template>
  <StepLayaout :show-header="false">
    <template #main>
      <Image />
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </template>
    <template #options>
      <Button @click="emits('onContinue')" color="primary"> Continuar </Button>
    </template>
  </StepLayaout>
</template>
