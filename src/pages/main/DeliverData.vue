<template>
  <div :style="Container">
    <div v-if="hasData">
      <!-- 데이터 있을 때 -->
      <div :style="Delete">
        <button :style="DeleteBtn">삭제</button>
      </div>
      <div :style="Contain">
        <ag-grid-vue
          :rowData="rowData"
          :columnDefs="colDefs"
          style="height: 500px"
        />
      </div>
    </div>

    <div v-else>
      <!-- 데이터 없을 때 -->
      <div style="text-align: center">
        <div :style="Nodata">배송 물품 데이터가 존재하지 않습니다.</div>
        <button :style="CreateBtn">새 데이터 생성하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import axios from "axios";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    const rowData = ref([]);
    const colDefs = ref([
      { field: "orderId", width: 80 },
      { field: "orderCreatedAt", width: 150 },
      { field: "sendUserId", width: 100 },
      { field: "receiveUserId", width: 100 },
      { field: "receiveUserAddress", width: 300 },
      { field: "orderItem", width: 200 },
      { field: "orderMemo", width: 190 },
      { field: "deliveryDate", width: 150 },
    ]);

    const hasData = computed(() => rowData.value.length > 0);

    onMounted(async () => {
      try {
        const response = await axios.get("lares/api/order/");
        console.log(response.data);
        if (Array.isArray(response.data.orderInfoList)) {
          rowData.value = response.data.orderInfoList;
        } else {
          console.error("받은 데이터가 배열이 아닙니다.");
          rowData.value = [];
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        rowData.value = [];
      }
    });

    return {
      rowData,
      colDefs,
      hasData,
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "GongGothicMedium",
        fontSize: "17px",
        margin: "0px 50px 0px 50px",
      },
      Body: {
        height: "76px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "PretendardRegular",
        fontSize: "18px",
        margin: "0px 50px 0px 50px",
      },
      Data: { width: "140px" },
      Check: {
        width: "20px",
        height: "20px",
      },
      Nodata: {
        color: "#0c007b",
        fontSize: "20px",
        fontFamily: "GongGothicLight",
        paddingBottom: "30px",
      },
      CreateBtn: {
        padding: "20px 45px",
        borderRadius: "12px",
        color: "white",
        backgroundColor: "#0c007b",
        fontSize: "20px",
        fontFamily: "PretendardBold",
        cursor: "pointer",
      },
    };
  },
};
</script>
