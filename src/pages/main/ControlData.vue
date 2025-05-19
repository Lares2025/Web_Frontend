<template>
  <div :style="Container">
    <div>
      <div :style="Delete">
        <button :style="DeleteBtn">삭제</button>
      </div>
      <div :style="Contain">
        <div :style="Head">
          <div><input :style="Check" type="checkbox" /></div>
          <div :style="Data">제어 데이터 식별자</div>
          <div :style="Data">제어 실행 일자</div>
          <div :style="Data">제어 실행 관리자</div>
          <div :style="Data">수신 로봇 명</div>
          <div :style="Data">정렬 데이터 개수</div>
          <div :style="Data">정렬 데이터 방식</div>
        </div>
        <div :style="Line" />
        <div v-for="(robot, index) in robots" :key="index" :style="Body">
          <div><input :style="Check" type="checkbox" /></div>
          <div :style="Data">{{ robot.id }}</div>
          <div :style="Data">{{ robot.date }}</div>
          <div :style="Data">{{ robot.manager }}</div>
          <div :style="Data">{{ robot.robot }}</div>
          <div :style="Data">{{ robot.count }}</div>
          <div :style="Data">{{ robot.method }}</div>
        </div>
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
        display: "flex",
        justifyContent: "end",
      },
      DeleteBtn: {
        padding: "15px 35px",
        backgroundColor: "#818181",
        color: "#C5C5C5",
        border: "none",
        borderRadius: "12px",
        fontSize: "18px",
        fontFamily: "PretendardMedium",
        marginTop: "80px",
        marginBottom: "30px",
      },
      Line: {
        width: "1276px",
        height: "0.5px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      Contain: {
        width: "1276px",
        height: "476px",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "12px",
      },
      Head: {
        height: "76px",
        display: "flex",
        flexDirection: "robot",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "GongGothicMedium",
        fontSize: "17px",
        margin: "0px 50px 0px 50px ",
      },
      Body: {
        height: "76px",
        display: "flex",
        flexDirection: "robot",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "PretendardRegular",
        fontSize: "18px",
        margin: "0px 50px 0px 50px ",
      },
      Data: { width: "140px" },
      Check: {
        width: "20px",
        height: "20px",
      },
      robots: [
        {
          id: "0001",
          date: "20250312",
          manager: "0.0_wji",
          robot: "LARES1",
          count: 6,
          method: "ASC",
        },
        {
          id: "0002",
          date: "20250313",
          manager: "0.0_kim",
          robot: "LARES2",
          count: 8,
          method: "DESC",
        },
        {
          id: "0003",
          date: "20250314",
          manager: "0.0_lee",
          robot: "LARES3",
          count: 5,
          method: "ASC",
        },
      ],
    };
  },
};
</script>
