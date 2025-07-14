<template>
  <div :style="Container">
    <div v-if="hasData">
      <!-- 데이터 있을 때 -->
      <div :style="BtnContainer">
        <button
          :style="getDeleteBtnStyle()"
          :disabled="selectedRows.length === 0"
          @click="deleteSelectedRows"
        >
          삭제
        </button>
      </div>
      <div :style="Contain">
        <ag-grid-vue
          :rowData="rowData"
          :columnDefs="colDefs"
          :gridOptions="gridOptions"
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

    <!-- 삭제 확인 팝업 -->
    <div v-if="isDeletePopupVisible" :style="PopupOverlay">
      <div :style="DeletePopupBox">
        <div style="text-align: center; padding: 20px">
          <div :style="DeleteTitle">
            데이터 {{ selectedRows.length }}개를 삭제하시겠습니까?
          </div>
          <div :style="DeleteMessage">
            데이터는 삭제 후 복구 및 수정이 불가능합니다.
          </div>
          <div
            style="
              margin-top: 30px;
              display: flex;
              gap: 15px;
              justify-content: center;
            "
          >
            <button :style="ConfirmDeleteBtn" @click="confirmDelete">
              삭제
            </button>
            <button :style="CancelDeleteBtn" @click="cancelDelete">취소</button>
          </div>
        </div>
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
    const selectedRows = ref([]);
    const isDeletePopupVisible = ref(false);

    const colDefs = ref([
      {
        headerName: "",
        field: "checkbox",
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: "left",
      },
      { field: "controlAmount", sortable: true, width: 150 },
      { field: "controlCreatedAt", sortable: true, width: 250 },
      { field: "controlDirection", sortable: true, width: 200 },
      { field: "controlId", sortable: true, width: 150 },
      { field: "robotName", sortable: true, width: 260 },
      { field: "userId", sortable: true, width: 260 },
    ]);

    const gridOptions = ref({
      rowSelection: "multiple",
      suppressHorizontalScroll: true,
      onSelectionChanged: (event) => {
        selectedRows.value = event.api.getSelectedRows();
      },
    });

    const hasData = computed(() => rowData.value.length > 0);

    const loadData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("lares/api/control/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.dataInfoList)) {
          rowData.value = response.data.dataInfoList;
        } else {
          rowData.value = [];
        }
      } catch (error) {
        rowData.value = [];
      }
    };

    const deleteSelectedRows = () => {
      if (selectedRows.value.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }
      isDeletePopupVisible.value = true;
    };

    const confirmDelete = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const deletePromises = selectedRows.value.map(async (row) => {
          await axios.delete(`lares/api/control/${row.controlId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        });
        await Promise.all(deletePromises);
        alert("선택된 항목들이 성공적으로 삭제되었습니다.");
        selectedRows.value = [];
        isDeletePopupVisible.value = false;
        await loadData();
      } catch (error) {
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
        isDeletePopupVisible.value = false;
      }
    };

    const cancelDelete = () => {
      isDeletePopupVisible.value = false;
    };

    const getDeleteBtnStyle = () => {
      const baseStyle = {
        padding: "15px 35px",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontSize: "18px",
        fontFamily: "PretendardMedium",
        marginTop: "80px",
        marginBottom: "30px",
        cursor: "pointer",
      };
      if (selectedRows.value.length > 0) {
        return {
          ...baseStyle,
          backgroundColor: "#FF0000",
        };
      } else {
        return {
          ...baseStyle,
          backgroundColor: "#818181",
          color: "#C5C5C5",
          opacity: "0.5",
        };
      }
    };

    onMounted(async () => {
      await loadData();
    });

    return {
      rowData,
      colDefs,
      gridOptions,
      selectedRows,
      hasData,
      isDeletePopupVisible,
      deleteSelectedRows,
      confirmDelete,
      cancelDelete,
      getDeleteBtnStyle,
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
      BtnContainer: {
        display: "flex",
        justifyContent: "end",
        gap: "20px",
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
        paddingBottom: "30px",
      },
      PopupOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      DeletePopupBox: {
        width: "400px",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
        fontFamily: "PretendardRegular",
      },
      DeleteTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#0C007B",
        marginBottom: "20px",
        fontFamily: "PretendardBold",
      },
      DeleteMessage: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "20px",
        fontFamily: "PretendardRegular",
      },
      ConfirmDeleteBtn: {
        padding: "12px 25px",
        color: "white",
        backgroundColor: "#0C007B",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontFamily: "PretendardMedium",
      },
      CancelDeleteBtn: {
        padding: "12px 25px",
        color: "#818181",
        backgroundColor: "#F6F6F6",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontFamily: "PretendardMedium",
      },
    };
  },
};
</script>
