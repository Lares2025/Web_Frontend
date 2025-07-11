<template>
  <div :style="Container">
    <div v-if="hasData">
      <!-- 데이터 있을 때 -->
      <div :style="BtnContainer">
        <button :style="AddBtn" @click="openPopup">신규 추가</button>
        <button
          :style="getFixBtnStyle()"
          :disabled="selectedRows.length !== 1"
          @click="openEditPopup"
        >
          수정
        </button>
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
        <div :style="Nodata">배송 물품 데이터가 존재하지 않습니다.</div>
        <button :style="CreateBtn" @click="openPopup">
          새 데이터 생성하기
        </button>
      </div>
    </div>

    <!-- 추가/수정 팝업 -->
    <div v-if="isPopupVisible" :style="PopupOverlay">
      <div :style="PopupBox">
        <div style="max-width: 300px; margin: 0 auto">
          <!-- 첫 번째 줄 -->
          <div
            style="
              display: flex;
              flex-direction: column;
              flex: 1;
              margin-bottom: 15px;
            "
          >
            <div :style="Label">
              <div style="display: flex; align-items: center; gap: 2px">
                <div style="color: red">*</div>
                <span> 송신자 아이디</span>
              </div>
            </div>
            <input :style="Input" v-model="input1" placeholder="ex) 0.0_wji" />
          </div>
          <!-- 두 번째 줄 -->
          <div style="display: flex; gap: 30px; margin-bottom: 15px">
            <div style="display: flex; flex-direction: column; flex: 1">
              <div :style="Label">
                <div style="display: flex; align-items: center; gap: 2px">
                  <div style="color: red">*</div>
                  <span>주문 상품 명</span>
                </div>
              </div>
              <input
                :style="Input1"
                v-model="input3"
                placeholder="ex) Raspberry Pi"
              />
            </div>
            <div style="display: flex; flex-direction: column; flex: 1">
              <label :style="Label">
                <div style="display: flex; align-items: center; gap: 2px">
                  <div style="color: red">*</div>
                  <span> 주문 상품 수량</span>
                </div>
              </label>
              <input :style="Input1" v-model="input4" placeholder="ex) 3" />
            </div>
          </div>

          <!-- 세 번째 줄 -->
          <div
            style="margin-bottom: 15px; display: flex; flex-direction: column"
          >
            <label :style="Label">송장 메모</label>
            <div :style="InputContainer">
              <input
                :style="Input2"
                v-model="input5"
                placeholder="메모를 입력하거나 선택하세요"
                @focus="showDropdown = true"
                @blur="handleBlur"
              />
              <div v-if="showDropdown" :style="DropdownStyle">
                <div
                  v-for="option in memoOptions"
                  :key="option"
                  :style="DropdownItem"
                  @mousedown="selectOption(option)"
                >
                  {{ option }}
                </div>
              </div>
            </div>
          </div>
          <div
            style="margin-bottom: 15px; display: flex; flex-direction: column"
          >
            <div :style="Label">
              <div style="display: flex; align-items: center; gap: 2px">
                <div style="color: red">*</div>
                <span>배송 일자</span>
              </div>
            </div>
            <input :style="Input3" v-model="input6" type="date" />
          </div>
          <!-- 버튼 영역 -->
          <div style="text-align: center; margin-top: 30px">
            <button
              :style="PlusBtn"
              @click="addMessage"
              style="margin-right: 10px"
            >
              {{ isEditMode ? "수정" : "추가" }}
            </button>
            <button :style="CloseBtn" @click="closePopup">닫기</button>
          </div>
        </div>
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
import { ref, onMounted, computed, nextTick } from "vue";
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

    const colDefs = ref([
      {
        headerName: "",
        field: "checkbox",
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: "left",
      },
      { headerName: "번호", field: "orderId", width: 70 },
      { headerName: "주문일시", field: "orderCreatedAt", width: 150 },
      { headerName: "발신자", field: "sendUserId", width: 100 },
      { headerName: "수신자", field: "receiveUserId", width: 100 },
      { headerName: "배송주소", field: "receiveUserAddress", width: 250 },
      { headerName: "상품명", field: "orderItem", width: 200 },
      { headerName: "메모", field: "orderMemo", width: 205 },
      { headerName: "배송일", field: "deliveryDate", width: 150 },
    ]);

    const gridOptions = ref({
      rowSelection: "multiple",
      suppressHorizontalScroll: true,
      onSelectionChanged: (event) => {
        selectedRows.value = event.api.getSelectedRows();
      },
    });

    const hasData = computed(() => rowData.value.length > 0);

    const isPopupVisible = ref(false);
    const isDeletePopupVisible = ref(false);
    const isEditMode = ref(false);
    const editingOrderId = ref(null);
    const input1 = ref("");
    const input2 = ref("");
    const input3 = ref("");
    const input4 = ref("");
    const input5 = ref("");
    const input6 = ref("");
    const showDropdown = ref(false);
    const memoOptions = [
      "배송 전 미리 연락주세요",
      "부재시 경비실에 맡겨주세요",
      "문 앞에 놓고 가주세요",
    ];

    const selectOption = (option) => {
      input5.value = option;
      showDropdown.value = false;
    };

    const handleBlur = () => {
      setTimeout(() => {
        showDropdown.value = false;
      }, 200);
    };

    const openPopup = () => {
      isEditMode.value = false;
      editingOrderId.value = null;
      clearInputs();
      isPopupVisible.value = true;
    };

    const openEditPopup = () => {
      if (selectedRows.value.length !== 1) {
        alert("수정할 항목을 하나만 선택해주세요.");
        return;
      }

      const selectedRow = selectedRows.value[0];
      console.log("선택된 행 데이터:", selectedRow);

      isEditMode.value = true;
      editingOrderId.value = selectedRow.orderId;

      input1.value = selectedRow.sendUserId || "";
      input2.value = selectedRow.receiveUserId || "";

      if (selectedRow.orderItem) {
        const itemParts = selectedRow.orderItem.split("/");
        if (itemParts.length >= 2) {
          input3.value = itemParts[0].trim(); // 상품명
          input4.value = itemParts[1].trim(); // 수량
        } else {
          input3.value = selectedRow.orderItem;
          input4.value = selectedRow.orderAmount || "";
        }
      } else {
        input3.value = "";
        input4.value = selectedRow.orderAmount || "";
      }

      input5.value = selectedRow.orderMemo || "";

      // 날짜 형식 변환 ("25년 07월 31일" -> "2025-07-31")
      let formattedDate = "";
      if (selectedRow.deliveryDate) {
        const dateStr = selectedRow.deliveryDate.toString();
        console.log("원본 날짜:", dateStr); // 디버깅용

        // "25년 07월 31일" 형식 파싱
        const yearMatch = dateStr.match(/(\d+)년/);
        const monthMatch = dateStr.match(/(\d+)월/);
        const dayMatch = dateStr.match(/(\d+)일/);

        if (yearMatch && monthMatch && dayMatch) {
          const year = yearMatch[1];
          const month = monthMatch[1].padStart(2, "0");
          const day = dayMatch[1].padStart(2, "0");

          // 2자리 연도를 4자리로 변환 (25 -> 2025)
          const fullYear = year.length === 2 ? `20${year}` : year;

          formattedDate = `${fullYear}-${month}-${day}`;
        } else if (dateStr.length === 8) {
          // 기존 YYYYMMDD 형식 처리
          formattedDate = `${dateStr.substring(0, 4)}-${dateStr.substring(
            4,
            6
          )}-${dateStr.substring(6, 8)}`;
        } else {
          formattedDate = selectedRow.deliveryDate;
        }
        console.log("변환된 날짜:", formattedDate); // 디버깅용
      }

      // 팝업을 먼저 표시한 후 날짜 설정
      isPopupVisible.value = true;

      // nextTick으로 DOM 업데이트 후 날짜 설정
      nextTick(() => {
        input6.value = formattedDate;
        console.log("설정된 input6 값:", input6.value); // 디버깅용
      });
    };

    const closePopup = () => {
      isPopupVisible.value = false;
      isEditMode.value = false;
      editingOrderId.value = null;
      clearInputs();
    };

    const clearInputs = () => {
      input1.value = "";
      input2.value = "";
      input3.value = "";
      input4.value = "";
      input5.value = "";
      input6.value = "";
    };

    const addMessage = async () => {
      if (
        !input1.value ||
        !input2.value ||
        !input3.value ||
        !input4.value ||
        !input6.value
      ) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }

      const token = localStorage.getItem("accessToken");
      console.log("저장된 토큰:", token);

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      try {
        const orderData = {
          sendUserId: input1.value,
          receiveUserId: input2.value,
          orderItem: input3.value,
          orderAmount: parseInt(input4.value),
          orderMemo: input5.value || "",
          deliveryDate: input6.value.replace(/-/g, ""),
        };

        console.log("전송할 데이터:", orderData);

        let response;
        if (isEditMode.value && editingOrderId.value) {
          // 수정 모드 - PATCH 요청 사용
          response = await axios.patch(
            `lares/api/order/${editingOrderId.value}`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          // 추가 모드
          response = await axios.post("lares/api/order/", orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }

        console.log("서버 응답:", response);

        if (response.status === 200 || response.status === 201) {
          const message = isEditMode.value
            ? "주문이 성공적으로 수정되었습니다."
            : "주문이 성공적으로 등록되었습니다.";
          alert(message);
          closePopup();
          await loadData();
        }
      } catch (error) {
        console.error(
          isEditMode.value ? "주문 수정 실패:" : "주문 등록 실패:",
          error
        );
        console.error("에러 응답:", error.response);
        console.error("에러 데이터:", error.response?.data);

        if (error.response?.status === 400) {
          alert(
            `잘못된 요청입니다: ${
              error.response.data?.message || "데이터 형식을 확인해주세요"
            }`
          );
        } else if (error.response?.status === 401) {
          alert("권한이 없습니다. 다시 로그인해주세요.");
        } else if (error.response?.status === 403) {
          alert("접근 권한이 없습니다.");
        } else if (error.response?.status === 404) {
          alert("수정할 주문을 찾을 수 없습니다.");
        } else {
          const message = isEditMode.value
            ? "주문 수정에 실패했습니다. 다시 시도해주세요."
            : "주문 등록에 실패했습니다. 다시 시도해주세요.";
          alert(message);
        }
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
      if (!token) {
        alert("로그인이 필요합니다.");
        isDeletePopupVisible.value = false;
        return;
      }

      try {
        const deletePromises = selectedRows.value.map(async (row) => {
          const response = await axios.delete(
            `lares/api/order/${row.orderId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response;
        });

        await Promise.all(deletePromises);
        alert("선택된 항목들이 성공적으로 삭제되었습니다.");

        // 선택된 행들 초기화
        selectedRows.value = [];

        // 삭제 팝업 닫기
        isDeletePopupVisible.value = false;

        // 데이터 다시 로드
        await loadData();
      } catch (error) {
        console.error("삭제 실패:", error);
        console.error("에러 응답:", error.response);

        if (error.response?.status === 401) {
          alert("권한이 없습니다. 다시 로그인해주세요.");
        } else if (error.response?.status === 404) {
          alert("삭제할 항목을 찾을 수 없습니다.");
        } else {
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }

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

    const getFixBtnStyle = () => {
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

      if (selectedRows.value.length === 1) {
        return {
          ...baseStyle,
          backgroundColor: "#0C007B",
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

    const loadData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("저장된 토큰:", token);

        if (!token) {
          console.log("토큰이 없습니다.");
          rowData.value = [];
          return;
        }

        const response = await axios.get("lares/api/order/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("데이터 로드 성공:", response);

        if (Array.isArray(response.data.orderInfoList)) {
          rowData.value = response.data.orderInfoList;
        } else {
          console.error("받은 데이터가 배열이 아닙니다.");
          rowData.value = [];
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        console.error("에러 응답:", error.response);

        if (error.response?.status === 401) {
          console.log("인증 실패 - 토큰이 유효하지 않음");
          localStorage.removeItem("accessToken");
        }

        rowData.value = [];
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
      isPopupVisible,
      openPopup,
      closePopup,
      addMessage,
      deleteSelectedRows,
      confirmDelete,
      cancelDelete,
      getDeleteBtnStyle,
      getFixBtnStyle,
      openEditPopup,
      isEditMode,
      isDeletePopupVisible,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      showDropdown,
      memoOptions,
      selectOption,
      handleBlur,
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
      AddBtn: {
        padding: "15px 35px",
        backgroundColor: "#0C007B",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontSize: "18px",
        fontFamily: "PretendardMedium",
        marginTop: "80px",
        marginBottom: "30px",
        cursor: "pointer",
      },
      FixBtn: {
        padding: "15px 35px",
        backgroundColor: "#818181",
        color: "#C5C5C5",
        border: "none",
        borderRadius: "12px",
        fontSize: "18px",
        fontFamily: "PretendardMedium",
        marginTop: "80px",
        marginBottom: "30px",
        cursor: "pointer",
        opacity: "0.5",
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
        cursor: "pointer",
        opacity: "0.5",
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
      CreateBtn: {
        padding: "20px 45px",
        borderRadius: "12px",
        color: "white",
        backgroundColor: "#0c007b",
        fontSize: "20px",
        fontFamily: "PretendardBold",
        cursor: "pointer",
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
      PopupBox: {
        width: "350px",
        backgroundColor: "white",
        padding: "50px 50px",
        borderRadius: "12px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
        fontFamily: "PretendardRegular",
      },
      PlusBtn: {
        padding: "15px 30px",
        color: "white",
        backgroundColor: "#0C007B",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
        fontFamily: "PretendardMedium",
      },
      CloseBtn: {
        padding: "15px 30px",
        color: "#818181",
        backgroundColor: "#F6F6F6",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
        fontFamily: "PretendardMedium",
      },
      Label: {
        marginBottom: "5px",
        textAlign: "left",
        fontSize: "15px",
        color: "#0C007B",
        fontFamily: "PretendardMedium",
      },
      Input: {
        width: "60%",
        padding: "12px 0px",
        borderRadius: "10px",
        border: "1px solid #CECCE5",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
        backgroundColor: "#F6F6F6",
        textIndent: "10px",
      },
      Input1: {
        width: "100%",
        padding: "12px 0px",
        borderRadius: "10px",
        border: "1px solid #CECCE5",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
        backgroundColor: "#F6F6F6",
        textIndent: "10px",
      },
      Input2: {
        width: "100%",
        padding: "12px 0px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
        textIndent: "10px",
      },
      Input3: {
        width: "40%",
        padding: "12px 10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
      },
      SelectStyle: {
        width: "100%",
        padding: "12px 10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
        backgroundColor: "#F6F6F6",
        marginBottom: "10px",
      },
      InputContainer: {
        position: "relative",
        width: "100%",
      },
      DropdownStyle: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "0 0 10px 10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 1000,
        maxHeight: "150px",
        overflowY: "auto",
      },
      DropdownItem: {
        padding: "12px 10px",
        cursor: "pointer",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
        borderBottom: "1px solid #f0f0f0",
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
