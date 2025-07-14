<template>
  <header class="header-container">
    <div class="logo" @click="goToHome">LARES</div>
    <div class="pages">
      <div
        v-for="(page, index) in pageList"
        :key="index"
        :class="['page', { active: selectedPage === index }]"
        @click="selectPage(index)"
      >
        {{ page.name }}
      </div>
    </div>
    <div class="logout" @click="logout">로그아웃</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedPage: 0,
      pageList: [
        { name: "로봇 제어 데이터 전송", path: "/send" },
        { name: "제어 내역 데이터 관리", path: "/control" },
        { name: "배송 물품 데이터 관리", path: "/deliver" },
        { name: "기타 데이터 관리", path: "/etc" },
      ],
    };
  },

  methods: {
    selectPage(index) {
      this.selectedPage = index;
      const selectedPath = this.pageList[index].path;
      this.$router.push(selectedPath);
    },
    updateSelectedPageByPath(path) {
      const foundIndex = this.pageList.findIndex((page) => page.path === path);
      this.selectedPage = foundIndex !== -1 ? foundIndex : 0;
    },
    logout() {
      // localStorage에서 토큰 제거
      localStorage.removeItem("accessToken");

      // 로그인 페이지로 리다이렉트
      this.$router.push("/");

      // 로그아웃 완료 메시지 (선택사항)
      console.log("로그아웃이 완료되었습니다.");
    },
    goToHome() {
      this.$router.push("/send");
      this.selectedPage = 0;
    },
  },
  mounted() {
    this.updateSelectedPageByPath(this.$route.path);
  },
  watch: {
    "$route.path"(newPath) {
      this.updateSelectedPageByPath(newPath);
    },
  },
};
</script>

<style scoped>
.header-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  padding: 0 80px;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #0c007b;
  font-size: 30px;
  font-family: GongGothicBold;
  cursor: pointer;
}

.pages {
  display: flex;
  gap: 10px;
  font-size: 22px;
  font-family: PretendardMedium;
}

.page {
  padding: 16px 50px;
  color: #2c2c2c;
  cursor: pointer;
  border-radius: 2px;
}

.page.active {
  background-color: #ebe9ff;
  color: #2817bf;
}

.logout {
  font-size: 22px;
  font-family: PretendardMedium;
  color: #818181;
  cursor: pointer;
}
</style>
