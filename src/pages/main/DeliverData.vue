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
        <button :style="CreateBtn" @click="openPopup">
          새 데이터 생성하기
        </button>
      </div>
    </div>

    <!-- 팝업 -->
    <div v-if="isPopupVisible" :style="PopupOverlay">
      <div :style="PopupBox">
        <div style="max-width: 300px; margin: 0 auto">
          <!-- 첫 번째 줄 -->
          <div style="display: flex; gap: 30px; margin-bottom: 15px">
            <div style="display: flex; flex-direction: column; flex: 1">
              <div :style="Label">
                <div style="display: flex; align-items: center; gap: 2px">
                  <div style="color: red">*</div>
                  <span> 발신자 아이디</span>
                </div>
              </div>
              <input
                :style="Input1"
                v-model="input1"
                placeholder="ex) 0.0_wji"
              />
            </div>
            <div style="display: flex; flex-direction: column; flex: 1">
              <div :style="Label">
                <div style="display: flex; align-items: center; gap: 2px">
                  <div style="color: red">*</div>
                  <span> 수신자 아이디</span>
                </div>
              </div>
              <input
                :style="Input1"
                v-model="input2"
                placeholder="ex) punke_07"
              />
            </div>
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
              추가
            </button>
            <button :style="CloseBtn" @click="closePopup">닫기</button>
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

    const isPopupVisible = ref(false);
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
      isPopupVisible.value = true;
    };
    const closePopup = () => {
      isPopupVisible.value = false;
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

        const response = await axios.post("lares/api/order/", orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("서버 응답:", response);

        if (response.status === 200 || response.status === 201) {
          alert("주문이 성공적으로 등록되었습니다.");
          closePopup();
          input1.value = "";
          input2.value = "";
          input3.value = "";
          input4.value = "";
          input5.value = "";
          input6.value = "";
          await loadData();
        }
      } catch (error) {
        console.error("주문 등록 실패:", error);
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
        } else {
          alert("주문 등록에 실패했습니다. 다시 시도해주세요.");
        }
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
      hasData,
      isPopupVisible,
      openPopup,
      closePopup,
      addMessage,
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
    };
  },
};
</script>
