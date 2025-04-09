<template>
  <div :style="Container">
    <div :style="LogoContain">
      <div :style="LogoTitle">LARES</div>
      <div :style="LogoSub">BSSM - Logistics Autonomous Robot ERP System</div>
    </div>
    <div :style="LoginContain">
      <div :style="Signin">회원 가입</div>
      <div>로그인</div>
    </div>
    <div :style="InputContain">
      <input placeholder="이름" :style="SigninInput" class="signininput" />
      <input
        placeholder="아이디"
        type="password"
        :style="SigninInput"
        class="signininput"
      />
    </div>
    <button :style="SigninButton">로그인</button>
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
        aliginItems: "center",
      },
      LogoContain: {
        position: "fixed",
        top: "70px",
        display: "flex",
        flexDirection: "column",
      },
      Signin: {
        color: "#CECCE5",
      },
      LogoTitle: {
        color: "#0C007B",
        fontSize: "60px",
        fontFamily: "GongGothicBold",
        fontWeight: "700",
        wordWrap: "break-word",
      },
      LogoSub: {
        color: "#0C007B",
        fontSize: "10px",
        fontFamily: "PretendardLight",
        fontWeight: "300",
        wordWrap: "break-word",
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
        fontFamily: "PretendardThin",
        fontSize: "20px",
        backgroundColor: "#F6F6F6",
      },
      SigninButton: {
        position: "fixed",
        top: "450px",
        width: "448px",
        height: "48px",
        borderRadius: "12px",
        backgroundColor: "#0C007B",
        color: "white",
        fontSize: "20px",
        fontFamily: "PretendardBold",
        fontWeight: "700",
      },
    };
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
