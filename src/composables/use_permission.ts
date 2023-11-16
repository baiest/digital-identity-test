import { ref } from "vue";

type CustomPermissionStatus =
  | "not-requested"
  | "loading"
  | "denied"
  | "granted"
  | "error";

export const usePermission = (name: PermissionName | "camera") => {
  const status = ref<CustomPermissionStatus>("not-requested");
  const setStatus = (state: CustomPermissionStatus | "prompt") => {
    if (state === "prompt") {
      status.value = "loading";
      return;
    }

    status.value = state;
  };

  const requestPermission = () => {
    navigator.permissions
      .query({ name })
      .then((permissionStatus) => {
        const { state } = permissionStatus;
        setStatus(state);

        permissionStatus.onchange = () => {
          setStatus(state);
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    status,
    setStatus,
    requestPermission
  };
};
