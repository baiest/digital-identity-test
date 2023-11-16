<script setup lang="ts">
import { onMounted } from "vue";
import Button from "../../shared/Button.vue";
const emits = defineEmits(["handleAction"]);

onMounted(() => {
  const circularProgress = document.querySelectorAll(".circular-progress");

  Array.from(circularProgress).forEach((progressBar) => {
    const progressValue = progressBar.querySelector(".percentage");
    const innerCircle = progressBar.querySelector(".inner-circle");
    let startValue = 0,
      endValue = Number(progressBar.getAttribute("data-percentage")),
      speed = 50,
      progressColor = progressBar.getAttribute("data-progress-color");

    const progress = setInterval(() => {
      startValue++;
      progressValue.textContent = `${startValue}%`;
      progressValue.style.color = `${progressColor}`;

      innerCircle.style.backgroundColor = `${progressBar.getAttribute(
        "data-inner-circle-color"
      )}`;

      progressBar.style.background = `conic-gradient(${progressColor} ${
        startValue * 3.6
      }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
      if (startValue === endValue) {
        clearInterval(progress);
      }
    }, speed);
  });
});
</script>
<template>
  <div
    class="h-[80%] w-[90%] max-h-[450px] max-w-[300px] m-4 lg:w-[40%] lg:h-[60%]"
  >
    <div class="h-full w-full bg-blue-200 relative rounded-full"></div>
    <div class="relative h-full w-full">
      <slot></slot>
      <div class="guide absolute top-0 w-full h-full"></div>
      <div
        class="absolute top-0 w-full h-full scale-2"
        style="border-radius: 100%"
      ></div>
    </div>
    <Button @click="emits('handleAction')">Grabar</Button>
  </div>
</template>
<style scoped>
.guide {
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 70%, red 70%);
  border-image: conic-gradient(lime, fuchsia, red) 1;
}
.guide-2 {
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 70%,
    blue 70%
  );
  border-image: conic-gradient(lime, fuchsia, red) 1;
}
</style>
