<template>
  <div :style="Container">
    <div :style="LogoTitle">LARES</div>
    <div :style="LogoSub">BSSM - Logistics Autonomous Robot ERP System</div>
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
      },
      LogoTitle: {
        color: "#0C007B",
        fontSize: "60px",
        fontFamily: "GongGothicBold",
        fontWeight: "700",
        wordWrap: "break-word",
      },
      LogoSub: {
        color: "#0C007B",
        fontSize: "10px",
        fontFamily: "PretendardLight",
        fontWeight: "300",
        wordWrap: "break-word",
      },
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
