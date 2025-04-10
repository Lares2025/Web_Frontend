<template>
  <div :style="Container">
    <div :style="ConnectBox">
      <img :src="Img" alt="robotimg" :style="RobotImg" />
      <div>
        <div :style="Status">
          <div :style="StatusDot" />
          <div :style="StatusText">Disconnect</div>
        </div>
        <div :style="Connect">
          <div :style="Name">LARES 01</div>
          <button :style="ConnectBtn">연결</button>
        </div>
        <div :style="Address">
          <input
            type="text"
            maxlength="3"
            placeholder="255"
            v-model="address1"
            @input="onInput('address1', $event)"
            :style="AddressInput"
          />
          <div :style="AddressDot">.</div>
          <input
            type="text"
            maxlength="3"
            placeholder="255"
            v-model="address2"
            @input="onInput('address2', $event)"
            :style="AddressInput"
          />
          <div :style="AddressDot">.</div>
          <input
            type="text"
            maxlength="3"
            placeholder="255"
            v-model="address3"
            @input="onInput('address3', $event)"
            :style="AddressInput"
          />
          <div :style="AddressDot">.</div>
          <input
            type="text"
            maxlength="3"
            placeholder="255"
            v-model="address4"
            @input="onInput('address4', $event)"
            :style="AddressInput"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      ConnectBox: {
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
      RobotImg: {
        width: "120px",
        height: "120px",
      },
      Status: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: "6px",
      },
      StatusDot: {
        width: "12px",
        height: "12px",
        borderRadius: "300px",
        backgroundColor: "#D70000",
      },
      StatusText: {
        color: "black",
        fontSize: "18px",
        fontFamily: "PretendardLight",
      },
      Connect: {
        display: "flex",
        alignItems: "center",
        gap: "120px",
        paddingTop: "6px",
      },
      Name: {
        color: "black",
        fontSize: "28px",
        fontFamily: "GongGothicBold",
      },
      ConnectBtn: {
        padding: "10px 22px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#818181",
        color: "#C5C5C5",
        fontSize: "12px",
        fontFamily: "PretendardBold",
      },
      Address: {
        display: "flex",
        gap: "10px",
        alignItems: "flex-end",
        paddingTop: "16px",
      },
      AddressInput: {
        width: "36px",
        height: "24px",
        padding: "12px 14px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontSize: "20px",
        fontFamily: "PretendardLight",
        color: "#818181",
        backgroundColor: "#F6F6F6",
      },
      AddressDot: {
        color: "#818181",
        fontSize: "20px",
        fontFamily: "PretendardLight",
      },
      address1: "",
      address2: "",
      address3: "",
      address4: "",
    };
  },
  methods: {
    onInput(field, event) {
      this[field] = event.target.value.replace(/[^0-9]/g, "").slice(0, 3);
    },
  },
};
</script>
