<template>
  <div>
    <RobotConnect />
    <RobotCam />
  </div>
</template>

<script>
import RobotConnect from "@/components/RobotConnect.vue";
import RobotCam from "@/components/RobotCam.vue";

export default {
  name: "DateSend",
  components: {
    RobotConnect,
    RobotCam,
  },
};
</script>
