<template>
  <div :style="Container">
    <div :style="LogoTitle">LARES</div>
    <div :stye="LogoSub">BSSM - Logistics Autonomous Robot ERP System</div>
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
        width: "241px",
        color: "#0C007B",
        fontSize: "60px",
        fontFamily: "GongGothicBold",
        fontWeight: "700",
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
