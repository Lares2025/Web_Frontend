<template>
  <VueLogin />
</template>

<script>
import VueLogin from "./pages/VueSignin.vue";

export default {
  name: "App",
  components: {
    VueLogin,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family: "GongGothicLight";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GongGothicBold";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicBold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "PretendardThin";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardThin.woff")
    format("woff");
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: "PretendardExtraLight";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardExtraLight.woff")
    format("woff");
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: "PretendardLight";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardLight.woff")
    format("woff");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "PretendardRegular";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardRegular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "PretendardMedium";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardMedium.woff")
    format("woff");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "PretendardSemiBold";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardSemiBold.woff")
    format("woff");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "PretendardBold";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardBold.woff")
    format("woff");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "PretendardExtraBold";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardExtraBold.woff")
    format("woff");
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: "PretendardBlack";
  src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardBlack.woff")
    format("woff");
  font-weight: 900;
  font-style: normal;
}
</style>
