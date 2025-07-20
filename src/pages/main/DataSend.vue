<template>
  <div class="data-send-container">
    <div class="center-wrapper">
      <!-- 이미지 박스 -->
      <div class="img-box-wrapper">
        <button class="load-btn" @click="fetchImage">불러오기</button>
        <div class="img-container">
          <img
            v-if="imgSrc"
            :src="imgSrc"
            class="control-image"
            alt="제어 이미지"
          />
          <div v-else class="img-placeholder">이미지가 없습니다</div>
        </div>
      </div>
      <!-- 최근 활동 영역 (flex row 안으로 이동) -->
      <div class="recent-activity">
        <h2>최근 활동</h2>
        <div class="activity-list">
          <div
            class="activity-item"
            v-for="activity in recentActivities"
            :key="activity.id"
          >
            <div class="activity-time">{{ activity.time }}</div>
            <div class="activity-content">{{ activity.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataSend",
  data() {
    return {
      imgSrc: null,
      recentActivities: [
        { id: 1, time: "14:30", content: "로봇이 B구역으로 이동 완료" },
        { id: 2, time: "14:25", content: "배송 작업 #1234 완료" },
        { id: 3, time: "14:20", content: "새로운 배송 작업 #1235 등록" },
        { id: 4, time: "14:15", content: "로봇 배터리 충전 시작" },
        { id: 5, time: "08:10", content: "새로운 배송 작업 #1234 등록" },
        { id: 6, time: "06:15", content: "로봇 배터리 충전 시작" },
      ],
      activityId: 5, // 다음 활동 ID
    };
  },
  methods: {
    // 현재 시간을 HH:MM 형식으로 반환
    getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },

    // 새로운 활동 추가
    addActivity(content) {
      const newActivity = {
        id: this.activityId++,
        time: this.getCurrentTime(),
        content: content,
      };

      // 배열 맨 앞에 추가 (최신 활동이 위에 오도록)
      this.recentActivities.unshift(newActivity);

      // 최대 10개까지만 유지
      if (this.recentActivities.length > 10) {
        this.recentActivities = this.recentActivities.slice(0, 10);
      }
    },

    async fetchImage() {
      try {
        // 활동 추가
        this.addActivity("이미지 불러오기 시도");

        const response = await fetch("/lares/api/control/img", {
          method: "GET",
          headers: {
            Accept: "image/jpeg",
          },
        });

        if (!response.ok) {
          throw new Error("이미지 불러오기 실패");
        }

        const blob = await response.blob();

        if (!blob.type.startsWith("image/")) {
          const text = await blob.text();
          console.log(text);
          alert("이미지 대신 받은 데이터: " + text);
          this.imgSrc = null;
          this.addActivity("이미지 불러오기 실패 - 잘못된 데이터 형식");
          return;
        }

        this.imgSrc = URL.createObjectURL(blob);
        this.addActivity("이미지 불러오기 성공");
      } catch (error) {
        console.error("이미지 불러오기 오류:", error);
        this.imgSrc = null;
        alert("이미지 불러오기에 실패했습니다.");
        this.addActivity("이미지 불러오기 실패");
      }
    },
  },
};
</script>

<style scoped>
.data-send-container {
  width: 100%;
  height: 100%;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 64px;
}

/* 이미지 박스 스타일 */
.img-box-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 278px;
  border: 1px solid #cecce5;
  border-radius: 15px;
  background: #fff;
  gap: 16px;
  box-sizing: border-box;
}

.load-btn {
  width: 120px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: #0c007b;
  color: #fff;
  font-family: PretendardBold;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.load-btn:hover {
  background: #0a0066;
}

.img-container {
  width: 300px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  border-radius: 10px;
  overflow: hidden;
}

.control-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.img-placeholder {
  color: #818181;
  font-family: PretendardLight;
  font-size: 16px;
}

/* 최근 활동 스타일 */
.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin-top: 40px;
  min-width: 300px;
  max-width: 400px;
  height: 400px; /* 고정 높이 설정 */
  display: flex;
  flex-direction: column;
}

.recent-activity h2 {
  color: #0c007b;
  font-size: 24px;
  font-family: PretendardBold;
  margin-bottom: 20px;
  flex-shrink: 0; /* 제목은 고정 */
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto; /* 세로 스크롤 추가 */
  flex: 1; /* 남은 공간 모두 차지 */
  padding-right: 8px; /* 스크롤바 공간 확보 */
}

/* 스크롤바 스타일링 */
.activity-list::-webkit-scrollbar {
  width: 6px;
}

.activity-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.activity-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.activity-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0; /* 아이템 크기 고정 */
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  background: #ebe9ff;
  color: #2817bf;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: PretendardBold;
  min-width: 50px;
  text-align: center;
  flex-shrink: 0; /* 시간 크기 고정 */
}

.activity-content {
  color: #2c2c2c;
  font-family: PretendardMedium;
  font-size: 14px;
  flex: 1; /* 남은 공간 차지 */
  word-break: break-word; /* 긴 텍스트 줄바꿈 */
}

/* 전역 스타일 */
:global(html),
:global(body),
:global(#app) {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
