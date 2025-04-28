<template>
  <div>
    <RobotConnect />
    <RobotCam />
    <RobotConsole />
  </div>
</template>

<script>
import RobotConnect from "@/components/RobotConnect.vue";
import RobotCam from "@/components/RobotCam.vue";
import RobotConsole from "@/components/RobotConsole.vue";

export default {
  name: "DateSend",
  components: {
    RobotConnect,
    RobotCam,
    RobotConsole,
  },
  data() {
    return {
      Container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      Contain_col: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
      },
      Contain_row: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "100px",
      },
    };
  },
};
</script>
