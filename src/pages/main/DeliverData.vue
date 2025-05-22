<template>
  <div :style="Container">
    <div>
      <div :style="Delete">
        <button :style="DeleteBtn">삭제</button>
      </div>
      <div :style="Contain">
        <ag-grid-vue
          :rowData="rowData"
          :columnDefs="colDefs"
          style="height: 500px"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    const rowData = ref([
      {
        state: true,
        number: "1",
        orderDate: "25년 05월 09일",
        postId: "0.0_wji",
        getId: "sliver",
        address: "부산광역시 강서구 가락대로 1393",
        item: "라즈베리파이 / 1",
        memo: "안전 배송",
        deliverDate: "25년 5월 30일",
      },
      {
        state: true,
        number: "2",
        orderDate: "25년 06월 13일",
        postId: "jiwoo",
        getId: "tomato",
        address: "부산광역시 강서구 가락대로 1393",
        item: "솔레노이드 액추에이터 / 5",
        memo: "신속 배송",
        deliverDate: "25년 10월 30일",
      },
      {
        state: true,
        number: "3",
        orderDate: "25년 07월 29일",
        postId: "kangeun",
        getId: "gold",
        address: "부산광역시 강서구 가락대로 1393",
        item: "물 / 10",
        memo: "안전 배송",
        deliverDate: "25년 10월 30일",
      },
    ]);

    const colDefs = ref([
      { field: "state" },
      { field: "number" },
      { field: "orderDate" },
      { field: "postId" },
      { field: "getId" },
      { field: "address" },
      { field: "item" },
      { field: "memo" },
      { field: "deliverDate" },
    ]);

    return {
      rowData,
      colDefs,
    };
  },
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
        alignitems: "center",
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
        border: "1px solpostId rgba(0, 0, 0, 0.5)",
        borderRadius: "12px",
      },
      Head: {
        height: "76px",
        display: "flex",
        flexDirection: "robot",
        justifyContent: "space-between",
        alignitems: "center",
        fontFamily: "GongGothicMedium",
        fontSize: "17px",
        margin: "0px 50px 0px 50px ",
      },
      Body: {
        height: "76px",
        display: "flex",
        flexDirection: "robot",
        justifyContent: "space-between",
        alignitems: "center",
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
          postId: "0001",
          orderDate: "20250312",
          manager: "0.0_wji",
          robot: "LARES1",
          count: 6,
          method: "ASC",
        },
        {
          postId: "0002",
          orderDate: "20250313",
          manager: "0.0_kim",
          robot: "LARES2",
          count: 8,
          method: "DESC",
        },
        {
          postId: "0003",
          orderDate: "20250314",
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
