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
import { ref, onMounted } from "vue";
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
      { field: "controlAmount", sortable: true, width: 150 },
      { field: "controlCreatedAt", sortable: true, width: 250 },
      { field: "controlDirection", sortable: true, width: 200 },
      { field: "controlId", sortable: true, width: 150 },
      { field: "robotName", sortable: true, width: 260 },
      { field: "userId", sortable: true, width: 260 },
    ]);

    onMounted(async () => {
      try {
        const response = await axios.get("lares/api/control/");
        console.log(response.data);
        if (Array.isArray(response.data.dataInfoList)) {
          rowData.value = response.data.dataInfoList;
        } else {
          console.error("받은 데이터가 배열이 아닙니다.");
          rowData.value = [];
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    });
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
    };
  },
};
</script>
