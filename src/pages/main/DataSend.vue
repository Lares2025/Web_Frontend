<template>
  <div :style="Container">
    <div :style="ConnectBox">
      <img :src="Img" alt="robotimg" :style="RobotImg" />
      <div :style="Status">
        <div :style="StatusDot" />
        <div :style="StatusText">Disconnect</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
        aliginItems: "center",
      },
      ConnectBox: {
        position: "fixed",
        display: "flex",
        width: "492px",
        height: "124px",
        padding: "60px",
        border: "1px solid #818181",
        borderRadius: "15px",
      },
      Img: require("@/assets/robot.svg"),
      RobotImg: {
        width: "120px",
        height: "120px",
      },
      Status: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: "6px",
      },
      StatusDot: {
        width: "12px",
        height: "12px",
        borderRadius: "300px",
        backgroundColor: "#D70000",
      },
      StatusText: {
        color: "black",
        fontSize: "18px",
        fontFamily: "PretendardLight",
      },
    };
  },
};
</script>
