<template>
  <div :style="Container">
    <div :style="DropdownContainer">
      <select
        :style="DropdownStyle"
        v-model="selectedDataType"
        @change="onDataTypeChange"
      >
        <option value="user">사용자 정보</option>
        <option value="robot">로봇 정보</option>
      </select>
    </div>
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
      <!-- 데이터 없을 때 -->
      <div style="text-align: center">
        <div :style="Nodata">유저 데이터가 존재하지 않습니다.</div>
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

    // 드롭다운 상태
    const selectedDataType = ref("user");

    // 사용자/로봇 컬럼 정의
    const userColDefs = [
      {
        headerName: "",
        field: "checkbox",
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: "left",
      },
      { field: "userId", headerName: "ID", width: 180 },
      { field: "userName", headerName: "이름", width: 200 },
      { field: "userAddress", headerName: "주소", width: 350 },
      { field: "userRole", headerName: "권한", width: 220 },
      { field: "userCreatedAt", headerName: "생성일", width: 310 },
    ];
    const robotColDefs = [
      {
        headerName: "",
        field: "checkbox",
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: "left",
      },
      { field: "robotId", headerName: "로봇ID", width: 120 },
      { field: "robotIp", headerName: "IP", width: 400 },
      { field: "robotName", headerName: "로봇명", width: 400 },
      { field: "robotCreatedAt", headerName: "생성일", width: 300 },
    ];

    const colDefs = ref(userColDefs);

    const gridOptions = ref({
      rowSelection: "multiple",
      suppressHorizontalScroll: true,
      onSelectionChanged: (event) => {
        selectedRows.value = event.api.getSelectedRows();
      },
    });

    const hasData = computed(() => rowData.value.length > 0);

    // 데이터 불러오기
    const loadData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        let url = "";
        if (selectedDataType.value === "user") {
          url = "lares/api/user/";
        } else {
          url = "lares/api/robot/";
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (
          selectedDataType.value === "user" &&
          Array.isArray(response.data.userList)
        ) {
          rowData.value = response.data.userList;
        } else if (
          selectedDataType.value === "robot" &&
          Array.isArray(response.data.robotList)
        ) {
          rowData.value = response.data.robotList;
        } else {
          rowData.value = [];
        }
      } catch (error) {
        rowData.value = [];
      }
    };

    // 드롭다운 변경 시
    const onDataTypeChange = async () => {
      selectedRows.value = [];
      colDefs.value =
        selectedDataType.value === "user" ? userColDefs : robotColDefs;
      await loadData();
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
        let deletePromises;
        if (selectedDataType.value === "user") {
          deletePromises = selectedRows.value.map(async (row) => {
            await axios.delete(`lares/api/user/${row.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          });
        } else {
          deletePromises = selectedRows.value.map(async (row) => {
            await axios.delete(`lares/api/robot/${row.robotId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          });
        }
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
        marginTop: "45px",
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
      selectedDataType,
      onDataTypeChange,
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
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      DropdownContainer: {
        position: "relative",
        top: "110px",
        right: "570px",
        display: "flex",
        justifyContent: "flex-end",
        margin: "30px 0 10px 0",
      },
      DropdownStyle: {
        fontSize: "18px",
        padding: "15px 20px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        backgroundColor: "#f5f5f5",
        fontFamily: "PretendardMedium",
        cursor: "pointer",
        outline: "none",
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
