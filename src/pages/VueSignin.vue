<template>
  <div :style="Container">
    <div :style="LogoContain">
      <div :style="LogoTitle">LARES</div>
      <div :style="LogoSub">BSSM - Logistics Autonomous Robot ERP System</div>
    </div>
    <div :style="LoginContain">
      <div @click="goToSignup" style="cursor: pointer">회원 가입</div>
      <div @click="goToLogin" :style="Login" style="cursor: pointer">
        로그인
      </div>
    </div>
    <div :style="InputContain">
      <input
        v-model="emptyBox.userName"
        placeholder="이름"
        :style="SigninInput"
        class="signininput"
      />
      <input
        v-model="emptyBox.userId"
        placeholder="아이디"
        :style="SigninInput"
        class="signininput"
      />
      <input
        v-model="emptyBox.userPassword"
        placeholder="비밀번호"
        type="password"
        :style="SigninInput"
        class="signininput"
      />
      <input
        v-model="emptyBox.userPasswordCheck"
        placeholder="비밀번호 확인"
        type="password"
        :style="SigninInput"
        class="signininput"
      />
      <input
        v-model="emptyBox.userAddress"
        placeholder="주소"
        :style="SigninInput"
        class="signininput"
      />
    </div>
    <button :style="SigninButton" @click="register">회원 가입</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      emptyBox: {
        userName: "",
        userId: "",
        userPassword: "",
        userPasswordCheck: "",
        userAddress: "",
      },
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
      LogoContain: {
        position: "fixed",
        top: "70px",
        display: "flex",
        flexDirection: "column",
      },
      Login: {
        color: "#CECCE5",
      },
      LogoTitle: {
        color: "#0C007B",
        fontSize: "60px",
        fontFamily: "GongGothicBold",
      },
      LogoSub: {
        color: "#0C007B",
        fontSize: "10px",
        fontFamily: "PretendardLight",
        marginTop: "-10.2px",
      },
      InputContain: {
        position: "fixed",
        top: "280px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      },
      LoginContain: {
        position: "fixed",
        top: "210px",
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        color: "#0C007B",
        fontSize: "20px",
        fontFamily: "PretendardLight",
      },
      SigninInput: {
        width: "428px",
        height: "24px",
        padding: "12px 10px", //위아래, 왼쪽오른쪽
        border: "1px solid #818181",
        borderRadius: "10px",
        fontFamily: "PretendardLight",
        fontSize: "20px",
        backgroundColor: "#F6F6F6",
      },
      SigninButton: {
        position: "fixed",
        top: "630px",
        width: "448px",
        height: "48px",
        borderRadius: "12px",
        backgroundColor: "#0C007B",
        color: "white",
        fontSize: "20px",
        fontFamily: "PretendardBold",
        border: "none",
      },
    };
  },
  methods: {
    goToSignup() {
      this.$router.push("/Signin");
    },
    goToLogin() {
      this.$router.push("/");
    },
    register() {
      axios
        .post("/lares/api/user/register", this.emptyBox, {
          headers: {},
        })
        .then((res) => {
          console.log("성공", res);
          this.$router.push("/");
        })
        .catch((res) => {
          console.error("실패", res);
        });
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.signininput::placeholder {
  font-family: Pretendard;
  font-weight: 100;
  font-size: 20px;
}
</style>
