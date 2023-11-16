<script setup lang="ts">
import StepLayout from "./layouts/StepLayout.vue";
import Button from "./shared/Button.vue";
import Image from "./shared/Image.vue";

const emits = defineEmits(["onContinue"]);
</script>
<template>
  <StepLayout :show-header="false">
    <template #main>
      <Image />
      <input type="number" />
      <span>Text</span>
      <span><a href="">otro ntento</a></span>
      <span
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
        recusandae, voluptates tempora iusto corrupti cumque. Dignissimos velit
        pariatur officia enim suscipit sapiente quod molestias autem, sequi id
        veritatis perferendis.</span
      >
      <span>
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
        recusandae, voluptates tempora iusto corrupti cumque. Dignissimos velit
        pariatur officia enim suscipit sapiente quod molestias autem, sequi id
        veritatis perferendis.</span
      >
    </template>
    <template #options>
      <Button variant="underline" @click="emits('onContinue')">
        Continue
      </Button>
    </template>
  </StepLayout>
</template>
