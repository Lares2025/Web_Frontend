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
        <!-- 첫 번째 줄 -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px">
          <div style="display: flex; flex-direction: column">
            <label :style="Label">*발신자 아이디</label>
            <input :style="Input1" v-model="input1" placeholder="ex) 0.0_wji" />
          </div>
          <div style="display: flex; flex-direction: column">
            <label :style="Label">*수신자 아이디</label>
            <input :style="Input1" v-model="input2" placeholder="ex) 0.0_wji" />
          </div>
        </div>
        <!-- 두 번째 줄 -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px">
          <div style="display: flex; flex-direction: column">
            <label :style="Label">*주문 상품 명</label>
            <input
              :style="Input1"
              v-model="input3"
              placeholder="ex) Raspberry Pi"
            />
          </div>
          <div style="display: flex; flex-direction: column">
            <label :style="Label">*주문 상품 수량</label>
            <input :style="Input1" v-model="input4" placeholder="ex) 3" />
          </div>
        </div>

        <!-- 세 번째 줄 -->
        <div style="margin-bottom: 15px; display: flex; flex-direction: column">
          <label :style="Label">송장 메모</label>
          <input
            :style="Input2"
            v-model="input5"
            placeholder="배송 전 미리 연락주세요"
          />
        </div>
        <div style="margin-bottom: 15px; display: flex; flex-direction: column">
          <label :style="Label">배송 일자</label>
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

    const openPopup = () => {
      isPopupVisible.value = true;
    };
    const closePopup = () => {
      isPopupVisible.value = false;
    };

    const addMessage = () => {
      console.log(
        "입력값:",
        input1.value,
        input2.value,
        input3.value,
        input4.value,
        input5.value
      );
      closePopup();
    };

    onMounted(async () => {
      try {
        const response = await axios.get("lares/api/order/", {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        });
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
      isPopupVisible,
      openPopup,
      closePopup,
      addMessage,
      input1,
      input2,
      input3,
      input4,
      input5,
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
        width: "300px",
        backgroundColor: "white",
        padding: "50px 90px",
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
        fontWeight: "bold",
        marginBottom: "5px",
        textAlign: "left",
        fontSize: "15px",
        fontFamily: "PretendardMedium",
      },
      Input1: {
        width: "100%",
        padding: "12px 3px",
        borderRadius: "10px",
        border: "1px solid #CECCE5",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
        backgroundColor: "#F6F6F6",
      },
      Input2: {
        width: "100%",
        padding: "12px 10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
      },
      Input3: {
        width: "40%",
        padding: "12px 10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "15px",
        fontFamily: "PretendardRegular",
      },
    };
  },
};
</script>
