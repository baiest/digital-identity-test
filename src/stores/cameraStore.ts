import { defineStore } from "pinia";
import { usePermission } from "../composables/use_permission";
import { ref, watchEffect } from "vue";

export const useCameraStore = defineStore("cameraStore", () => {
  const { status, setStatus, requestPermission } = usePermission("camera");
  const stream = ref<MediaStream | null>(null);
  const videoElement = ref<HTMLVideoElement | null>(null);
  const interval = ref();

  const constraints = {
    video: {
      frameRate: {
        ideal: 60,
        min: 10
      },
      width: { ideal: 1920, min: 1080},
      height: { ideal: 1080, min: 720},
      bitrate: { max: 2000 }
    },
    audio: false
  };

  const initCamera = (options = constraints) => {
    console.log("initCamera", options)
    navigator.mediaDevices
      .getUserMedia(options)
      .then((streamUserMedia) => {
        setStatus("granted");
        stream.value = streamUserMedia;

        if (!interval.value) {
          let i = 10
          interval.value = setInterval(() => {
            console.log("interval", i)
            if(i > 60){
              clearInterval(interval.value)
              return
            }
            constraints.video.frameRate = {
              ...constraints.video.frameRate,
              ideal: i
            }
            initCamera(constraints);
            i += 10

          }, 1);
        }
      })
      .catch((err) => {
        console.error(err, interval.value);
        if(!interval.value && err.name === 'OverconstrainedError'){
          return
        }

        setStatus("denied");
        return;
      });
  };

  watchEffect(async () => {
    console.log(!videoElement.value, !stream.value);
    if (!videoElement.value || !stream.value) {
      return;
    }

    try {
      videoElement.value.srcObject = stream.value;
      await videoElement.value.play();
    } catch (error) {}
  });

  return {
    status,
    stream,
    videoElement,
    setStatus,
    requestPermission,
    initCamera
  };
});
