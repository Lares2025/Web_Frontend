<template>
  <header class="header-container">
    <div class="logo">LARES</div>
    <div class="pages">
      <div
        v-for="(page, index) in pageList"
        :key="index"
        :class="['page', { active: selectedPage === index }]"
        @click="selectPage(index)"
      >
        {{ page }}
      </div>
    </div>
    <div class="logout">로그아웃</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedPage: 0,
      pageList: [
        "로봇 제어 데이터 전송",
        "제어 내역 데이터 관리",
        "배송 물품 데이터 관리",
        "기타 데이터 관리",
      ],
    };
  },
  methods: {
    selectPage(index) {
      this.selectedPage = index;
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
}
</style>
