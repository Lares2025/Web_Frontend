<template>
  <div :style="Container">
    <div :style="ConnectBox">
      <div :style="Line" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Container: {
        position: "absolute",
        top: "380px",
        left: 0,
        right: "640px",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      ConnectBox: {
        position: "fixed",
        display: "flex",
        gap: "30px",
        width: "572px",
        height: "278px",
        padding: "20px",
        border: "1px solid #818181",
        borderRadius: "15px",
      },
      Line: {
        width: "100%",
      },
    };
  },
};
</script>
