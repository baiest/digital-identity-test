<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCameraStore } from "../../../stores/cameraStore";
import StepLayout from "../../layouts/StepLayout.vue";
import Camera from "./Camera.vue";
import Guide from "./Guide.vue";
import { onMounted, ref, watch } from "vue";

const signal =
  "https://1909-2800-e2-a500-1d0-d1cc-d898-cdc5-8c4.ngrok-free.app";
const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
});
const dc = pc.createDataChannel("channel");

const { stream } = storeToRefs(useCameraStore());
const isCandateSended = ref(false);
const isConnected = ref(false);
const pcState = ref();
const id = "IDP1" + new Date().getTime();

const startRecording = async () => {
  try {
    dc.onmessage = (e) => console.log("Message: " + e.data);

    dc.onopen = () => {
      console.log("Connection open!");
    };

    pc.onicecandidate = async () => {
      if (isCandateSended.value || isConnected.value) {
        console.log("is already sended");
        return;
      }

      isCandateSended.value = true;
      try {
        console.log("Sending description", {
          process_id: id,
          offer: pc.localDescription
        });
        const response = await fetch(signal, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            process_id: id,
            offer: pc.localDescription
          }),
          mode: "cors"
        });

        const answer = await response.json();

        await pc.setRemoteDescription(answer);
      } catch (error) {
        console.log(error);
      } finally {
        isCandateSended.value = false;
      }
    };
    stream.value
      ?.getTracks()
      .forEach((track) => pc.addTrack(track, stream.value));

    pc.oniceconnectionstatechange = async () => {
      console.log("Connection state change: ", pc.iceConnectionState);
      if (pc.iceConnectionState === "connected") {
        isConnected.value = true;
      }

      pcState.value = pc.iceConnectionState;
    };

    // pc.onsignalingstatechange = (ev) => console.log(ev);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    console.log("Set successfully");
  } catch (error) {
    console.error("Error connecting webrtc server:", error);
  }
};

const handleSendMessage = () => {
  dc.send("Pruebita");
};

const start = () => {
  dc.send(id + ";start");
};
const stop = () => {
  dc.send(id + ";stop");
  dc.close();
  pc.close();
};

watch(stream, (value) => {
  if (!value) {
    return;
  }

  const timeout = setTimeout(() => {
    startRecording();
    clearTimeout(timeout);
  }, 1000);
});
</script>
<template>
  <StepLayout>
    <template #main>
      <div class="flex flex-col items-center justify-between h-full w-full">
        <p>{{ pcState }}</p>
        <p>{{ !!stream?.getTracks() }}</p>
        <p>{{ id }}</p>
        <Guide @handleAction="start">
          <Camera />
        </Guide>

        <button @click="stop">Repetir</button>
      </div>
    </template>
  </StepLayout>
</template>
