<template>
  <div>
    <!-- 연결 여부 박스 -->
    <div :style="containerTop">
      <div :style="connectBoxTop">
        <img :src="Img" alt="robotimg" :style="robotImg" />
        <div>
          <div :style="status">
            <div :style="computedStatusDot" />
            <div :style="statusTextStyle">{{ statusText }}</div>
          </div>
          <div :style="connect">
            <div :style="name">LARES 01</div>
            <button :style="connectBtn" @click="toggleConnection">
              {{ buttonText }}
            </button>
          </div>
          <div :style="address">
            <input
              type="text"
              maxlength="3"
              placeholder="255"
              v-model="address1"
              @input="onInput('address1', $event)"
              :style="addressInput"
            />
            <div :style="addressDot">.</div>
            <input
              type="text"
              maxlength="3"
              placeholder="255"
              v-model="address2"
              @input="onInput('address2', $event)"
              :style="addressInput"
            />
            <div :style="addressDot">.</div>
            <input
              type="text"
              maxlength="3"
              placeholder="255"
              v-model="address3"
              @input="onInput('address3', $event)"
              :style="addressInput"
            />
            <div :style="addressDot">.</div>
            <input
              type="text"
              maxlength="3"
              placeholder="255"
              v-model="address4"
              @input="onInput('address4', $event)"
              :style="addressInput"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 콘솔 박스 -->
    <div :style="containerMiddle">
      <div :style="connectBoxMiddle">
        <div :style="contain">
          <div :style="box1">
            <div :style="box2">
              <input
                type="number"
                placeholder="데이터 개수"
                :style="dataNumber"
              />
              <select v-model="selectedOrder" :style="dataArray">
                <option value="up">오름차순</option>
                <option value="down">내림차순</option>
              </select>
              <button :style="sendBtn">제어 전송</button>
            </div>
          </div>
          <div :style="line" />
        </div>
      </div>
    </div>

    <!-- 웹캠 박스 -->
    <div :style="containerRight">
      <div :style="connectBoxRight">
        <div :style="box3">
          <button :style="actionBtn">DC 모터 동작 확인</button>
          <button :style="actionBtn">전자석 모듈 동작 확인</button>
          <button :style="actionBtn">카메라 동작 확인</button>
        </div>
        <video ref="webcam" autoplay playsinline :style="webcamStyle"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 연결 여부 박스
      containerTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      connectBoxTop: {
        position: "fixed",
        display: "flex",
        gap: "30px",
        width: "492px",
        height: "124px",
        padding: "60px",
        border: "1px solid #818181",
        borderRadius: "15px",
      },
      Img: require("@/assets/robot.svg"),
      robotImg: {
        width: "120px",
        height: "120px",
      },
      status: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: "6px",
      },
      statusTextStyle: {
        color: "black",
        fontSize: "18px",
        fontFamily: "PretendardLight",
      },
      connect: {
        display: "flex",
        alignItems: "center",
        gap: "120px",
        paddingTop: "6px",
      },
      name: {
        color: "black",
        fontSize: "28px",
        fontFamily: "GongGothicBold",
      },
      address: {
        display: "flex",
        gap: "10px",
        alignItems: "flex-end",
        paddingTop: "16px",
      },
      addressInput: {
        width: "36px",
        height: "24px",
        padding: "12px 14px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontSize: "20px",
        fontFamily: "PretendardLight",
        backgroundColor: "#F6F6F6",
      },
      addressDot: {
        color: "#818181",
        fontSize: "20px",
        fontFamily: "PretendardLight",
      },
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      connected: false,

      // 콘솔 박스
      containerMiddle: {
        position: "absolute",
        top: "380px",
        left: 0,
        right: "640px",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      connectBoxMiddle: {
        position: "fixed",
        display: "flex",
        gap: "30px",
        width: "572px",
        height: "278px",
        padding: "20px",
        border: "1px solid #818181",
        borderRadius: "15px",
      },
      contain: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      },
      box1: {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
      },
      box2: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      line: {
        width: "100%",
        height: "1px",
        backgroundColor: "#CECCE5",
      },
      selectedOrder: "up",

      // 웹캠 박스
      containerRight: {
        position: "absolute",
        top: "380px",
        left: "640px",
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      connectBoxRight: {
        position: "fixed",
        width: "612px",
        height: "318px",
        border: "1px solid #CECCE5",
        borderRadius: "15px",
      },
      webcamStyle: {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        objectFit: "cover",
      },
      box3: {
        position: "absolute",
      },
    };
  },
  computed: {
    isAddressComplete() {
      return (
        this.address1 !== "" &&
        this.address2 !== "" &&
        this.address3 !== "" &&
        this.address4 !== ""
      );
    },
    buttonText() {
      if (!this.isAddressComplete) return "연결";
      return this.connected ? "취소" : "연결";
    },
    connectBtn() {
      if (!this.isAddressComplete) {
        return {
          padding: "10px 22px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#818181",
          color: "#C5C5C5",
          fontSize: "12px",
          fontFamily: "PretendardBold",
          cursor: "not-allowed",
        };
      }
      return {
        padding: "10px 22px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: this.connected ? "#F6F6F6" : "#0C007B",
        color: this.connected ? "#0C007B" : "white",
        fontSize: "12px",
        fontFamily: "PretendardBold",
        cursor: "pointer",
      };
    },
    computedStatusDot() {
      return {
        width: "12px",
        height: "12px",
        borderRadius: "300px",
        backgroundColor: this.connected ? "#00C851" : "#D70000",
      };
    },
    statusText() {
      return this.connected ? "Connect" : "Disconnect";
    },
    dataNumber() {
      return {
        width: "80px",
        height: "14px",
        padding: "12px 10px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontFamily: "PretendardThin",
        fontSize: "12px",
        color: "#818181",
        backgroundColor: this.connected ? "#F6F6F6" : "#C5C5C5",
      };
    },
    dataArray() {
      return {
        width: "100px",
        height: "39px",
        padding: "10px 10px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontFamily: "PretendardThin",
        fontSize: "12px",
        color: "#818181",
        backgroundColor: this.connected ? "#F6F6F6" : "#C5C5C5",
        margin: "0px 250px 0px 0px",
      };
    },
    sendBtn() {
      return {
        width: "100px",
        height: "39px",
        padding: "10px 22px",
        borderRadius: "8px",
        border: "none",
        fontFamily: "PretendardBold",
        fontSize: "12px",
        color: this.connected ? "#FFFFFF" : "#C5C5C5",
        backgroundColor: this.connected ? "#0C007B" : "#818181",
      };
    },
    actionBtn() {
      return {
        width: "150px",
        height: "39px",
        padding: "10px 22px",
        margin: "20px",
        borderRadius: "8px",
        border: "none",
        fontFamily: "PretendardBold",
        fontSize: "12px",
        color: this.connected ? "#FFFFFF" : "#C5C5C5",
        backgroundColor: this.connected ? "#0C007B" : "#818181",
      };
    },
  },
  methods: {
    onInput(field, event) {
      this[field] = event.target.value.replace(/[^0-9]/g, "").slice(0, 3);
    },
    toggleConnection() {
      if (!this.isAddressComplete) return;
      this.connected = !this.connected;
    },
    startWebcam() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.webcam.srcObject = stream;
        })
        .catch((err) => {
          console.error("웹캠 접근 실패:", err);
        });
    },
    stopWebcam() {
      const stream = this.$refs.webcam?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        this.$refs.webcam.srcObject = null;
      }
    },
  },
  mounted() {},
  watch: {
    connected(newVal) {
      if (newVal) {
        this.startWebcam();
      } else {
        this.stopWebcam();
      }
    },
  },
};
</script>
