<template>
  <div :style="Container">
    <div :style="ConnectBox">
      <div :style="Contain">
        <div :style="Box1">
          <div :style="Box2">
            <input
              type="number"
              placeholder="데이터 개수"
              :style="DataNumber"
            />
            <select v-model="selectedFruit" :style="DataArray">
              <option value="up">오름차순</option>
              <option value="down">내림차순</option>
            </select>
            <button>제어 전송</button>
          </div>
        </div>
        <div :style="Line" />
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
      Contain: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      },
      Box1: {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
      },
      Box2: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      Line: {
        width: "100%",
        height: "1px",
        backgroundColor: "#CECCE5",
      },
      DataNumber: {
        width: "80px",
        height: "14px",
        padding: "12px 10px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontFamily: "PretendardThin",
        fontSize: "12px",
        color: "#818181",
        backgroundColor: "#C5C5C5",
      },
      DataArray: {
        width: "100px",
        height: "39px",
        padding: "10px 10px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontFamily: "PretendardThin",
        fontSize: "12px",
        color: "#818181",
        backgroundColor: "#C5C5C5",
        margin: "0px 280px 0px 0px",
      },
    };
  },
};
</script>
