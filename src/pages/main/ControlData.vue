<template>
  <div :style="Container">
    <div>
      <button :style="Delete">삭제</button>
      <div :style="Body">
        <div :style="Head">
          <div><input :style="Check" type="checkbox" /></div>
          <div>제어 데이터 식별자</div>
          <div>제어 실행 일자</div>
          <div>제어 실행 관리자</div>
          <div>수신 로봇 명</div>
          <div>정렬 데이터 개수</div>
          <div>정렬 데이터 방식</div>
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      Delete: {
        padding: "20px 45px",
        backgroundColor: "#818181",
        color: "#C5C5C5",
        border: "none",
        borderRadius: "12px",
        fontSize: "20px",
        fontFamily: "PretendardBold",
        marginTop: "80px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "end",
      },
      Line: {
        width: "1276px",
        height: "0.5px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      Head: {
        height: "76px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "GongGothicMedium",
        fontSize: "20px",
        margin: "0px 50px 0px 50px ",
      },
      Body: {
        width: "1276px",
        height: "476px",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "12px",
      },
      Check: {
        width: "20px",
        height: "20px",
      },
    };
  },
};
</script>
