<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
    <div class="line-legend">
      <div v-for="(label, i) in labels" :key="i" class="line-legend-item">
        <span
          >{{ label }}: <b>{{ data[i] }}</b></span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const props = defineProps({
  data: Array,
  labels: Array,
});

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: "배송 건수",
      data: props.data,
      fill: false,
      borderColor: "#0c007b",
      tension: 0.4,
    },
  ],
};
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};
</script>

<style scoped>
.line-legend {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 12px;
}
.line-legend-item {
  font-size: 15px;
}
</style>
