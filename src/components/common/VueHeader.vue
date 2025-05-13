<template>
  <header :style="Container">
    <div :style="Logo">LARES</div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      Container: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100vw",
        height: "85px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      Logo: {
        color: "#0C007B",
        fontSize: "30px",
        fontFamily: "GongGothicBold",
      },
    };
  },
};
</script>
