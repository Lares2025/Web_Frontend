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
      <!-- 데이터가 없을 때 -->
      <div style="text-align: center">
        <div :style="Nodata">제어 내역 데이터가 존재하지 않습니다.</div>
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
      { field: "controlAmount", sortable: true, width: 150 },
      { field: "controlCreatedAt", sortable: true, width: 250 },
      { field: "controlDirection", sortable: true, width: 200 },
      { field: "controlId", sortable: true, width: 150 },
      { field: "robotName", sortable: true, width: 260 },
      { field: "userId", sortable: true, width: 260 },
    ]);

    const hasData = computed(() => rowData.value.length > 0);

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
      Contain: {
        width: "1276px",
        height: "476px",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "12px",
      },
      Nodata: {
        color: "#0c007b",
        fontSize: "20px",
        fontFamily: "GongGothicLight",
      },
    };
  },
};
</script>
