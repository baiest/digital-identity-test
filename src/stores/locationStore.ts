import { defineStore } from 'pinia'
import { usePermission } from '../composables/use_permission'
import { ref } from 'vue';
export const useLocationStore = defineStore('locationStore', () => {
  const { status, setStatus, requestPermission } = usePermission("geolocation")
  const location = ref<GeolocationPosition | null>(null)
  const getLocation = () => {
    setStatus("loading")
    navigator.geolocation.getCurrentPosition(
      (res) => {
        setStatus("granted");
        location.value = res
      },
      () => {
        setStatus("denied");
      }
    );
  }
  
  return {
    status,
    location,
    getLocation,
    setStatus,
    requestPermission,
  }
})