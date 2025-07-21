<template>
  <header class="header-container">
    <div class="logo" @click="goToHome">LARES</div>
    <div class="pages">
      <div
        :class="['page', { active: selectedPage === 'send' }]"
        @click="selectPage('send')"
      >
        로봇 제어 데이터 전송
      </div>
      <div
        :class="[
          'page',
          'data-management',
          { active: selectedPage === 'management' },
        ]"
        @click="toggleSubmenu"
        @mouseenter="showSubmenu = true"
        @mouseleave="showSubmenu = false"
      >
        데이터 관리
        <div v-if="showSubmenu" class="submenu">
          <div
            v-for="(submenu, index) in submenuList"
            :key="index"
            :class="[
              'submenu-item',
              { active: selectedSubmenu === submenu.path },
            ]"
            @click="selectSubmenu(submenu.path)"
          >
            {{ submenu.name }}
          </div>
        </div>
      </div>
      <div
        :class="['page', { active: selectedPage === 'dashboard' }]"
        @click="selectPage('dashboard')"
      >
        대시보드
      </div>
    </div>

    <div class="logout" @click="logout">로그아웃</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedPage: "send", // 기본값을 "send"로 변경
      selectedSubmenu: "",
      showSubmenu: false,
      submenuList: [
        { name: "제어 내역", path: "/control" },
        { name: "배송 물품", path: "/deliver" },
        { name: "기타", path: "/etc" },
      ],
    };
  },

  methods: {
    selectPage(page) {
      this.selectedPage = page;
      this.selectedSubmenu = "";
      if (page === "dashboard") {
        this.$router.push("/dashboard");
      } else if (page === "send") {
        this.$router.push("/send");
      }
    },
    toggleSubmenu() {
      this.showSubmenu = !this.showSubmenu;
    },
    selectSubmenu(path) {
      this.selectedPage = "management";
      this.selectedSubmenu = path;
      this.showSubmenu = false;
      this.$router.push(path);
    },
    updateSelectedPageByPath(path) {
      if (path === "/dashboard") {
        this.selectedPage = "dashboard";
        this.selectedSubmenu = "";
      } else if (path === "/send") {
        this.selectedPage = "send";
        this.selectedSubmenu = "";
      } else if (["/control", "/deliver", "/etc"].includes(path)) {
        this.selectedPage = "management";
        this.selectedSubmenu = path;
      }
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
      this.selectedPage = "send";
      this.selectedSubmenu = "";
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
  position: relative;
}

.page.active {
  background-color: #ebe9ff;
  color: #2817bf;
}

.data-management {
  position: relative;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: row;
  padding: 8px 10px;
}

.submenu-item {
  padding: 12px 20px;
  color: #2c2c2c;
  cursor: pointer;
  font-size: 18px;
  border-right: 1px solid #f0f0f0;
  white-space: nowrap;
}

.submenu-item:last-child {
  border-right: none;
}

.submenu-item:hover {
  background-color: #f8f8f8;
}

.submenu-item.active {
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
