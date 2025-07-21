<template>
  <div class="dashboard-container">
    <div class="dashboard-grid">
      <div class="dashboard-row">
        <!-- 로봇 상태 카드 -->
        <div class="dashboard-card" style="height: 250px">
          <div class="card-header">
            <h3>로봇 상태</h3>
            <div class="status-indicator online"></div>
          </div>
          <div class="card-content">
            <div class="status-item">
              <span class="label">연결 상태:</span>
              <span class="value connected">연결됨</span>
            </div>

            <div class="status-item">
              <span class="label">현재 위치:</span>
              <span class="value">A구역</span>
            </div>

            <!-- 요약 정보를 로봇 상태 카드 내부로 이동 -->
            <div class="summary-grid">
              <div class="summary-item">
                <span class="summary-label">오늘 작업</span>
                <span class="summary-value">3건</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">오늘 배송</span>
                <span class="summary-value">8건</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">택배 불량 접수건</span>
                <span class="summary-value">2건</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">불량 회수 건</span>
                <span class="summary-value">1건</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 작업 현황 카드 (원 그래프) -->
        <div class="dashboard-card work-status-card" style="height: 250px">
          <div class="card-header">
            <h3>작업 현황</h3>
          </div>
          <div class="card-content" style="height: 200px; margin-top: 10px">
            <PieChart
              :data="[3, 12, 5]"
              :labels="['진행 중', '완료', '대기']"
            />
          </div>
        </div>
      </div>
      <div class="dashboard-row">
        <!-- 배송 현황 카드 (꺾은선 그래프) -->
        <div class="dashboard-card wide-card">
          <div class="card-header">
            <h3>배송 현황</h3>
          </div>
          <div class="card-content" style="height: 180px; margin-top: 10px">
            <LineChart
              :data="[8, 45, 180]"
              :labels="['오늘', '이번 주', '이번 달']"
            />
          </div>
        </div>
        <!-- 불량 현황 카드 (막대그래프) -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3>불량 접수 및 회수</h3>
          </div>
          <div class="card-content" style="height: 200px; margin-top: 20px">
            <BarChart :data="[2, 1]" :labels="['불량 접수건', '불량 회수건']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/common/PieChart.vue";
import LineChart from "@/components/common/LineChart.vue";
import BarChart from "@/components/common/BarChart.vue";

export default {
  name: "Dashboard",
  components: { PieChart, LineChart, BarChart },
};
</script>

<style scoped>
.dashboard-container {
  padding: 70px 40px 40px;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.dashboard-header {
  margin-bottom: 40px;
  text-align: center;
}
.dashboard-header h1 {
  color: #0c007b;
  font-size: 36px;
  font-family: GongGothicBold;
  margin-bottom: 10px;
}
.dashboard-header p {
  color: #666;
  font-size: 18px;
  font-family: PretendardMedium;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 0px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
.summary-item {
  background: #f5f6fa;
  border-radius: 6px;
  padding: 8px 16px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
.summary-label {
  display: block;
  color: #888;
  font-size: 11px;
  margin-bottom: 4px;
}
.summary-value {
  color: #0c007b;
  font-size: 16px;
  font-family: PretendardBold;
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 30px;
}
.dashboard-row {
  display: flex;
  gap: 24px;
}
.dashboard-row > .dashboard-card {
  flex: 1 1 0;
}
.dashboard-row > .dashboard-card.wide-card {
  flex: 2 1 0;
}
@media (max-width: 900px) {
  .dashboard-row {
    flex-direction: column;
    gap: 16px;
  }
}
.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.card-header h3 {
  color: #0c007b;
  font-size: 20px;
  font-family: PretendardBold;
  margin: 0;
}
.card-icon {
  font-size: 22px;
}
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.status-indicator.online {
  background-color: #4caf50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}
.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
.status-item:last-child {
  border-bottom: none;
}
.status-item .label {
  color: #666;
  font-family: PretendardMedium;
  font-size: 14px;
}
.status-item .value {
  color: #2c2c2c;
  font-family: PretendardBold;
  font-size: 14px;
}
.status-item .value.connected {
  color: #4caf50;
}
.work-status-card {
  max-width: 250px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.work-status-card .card-header,
.work-status-card .card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .dashboard-container {
    padding: 100px 10px 10px;
  }
  .summary-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
