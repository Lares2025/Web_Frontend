<template>
  <div :style="Container">
    <div :style="ConnectBox"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Container: {
        position: "absolute",
        top: "380px",
        left: "640px",
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      ConnectBox: {
        position: "fixed",
        display: "flex",
        gap: "30px",
        width: "492px",
        height: "278px",
        padding: "20px 60px",
        border: "1px solid #818181",
        borderRadius: "15px",
      },
    };
  },
};
</script>
