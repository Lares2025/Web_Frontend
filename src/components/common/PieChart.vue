<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
});

const chartData = {
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      borderWidth: 1,
    },
  ],
};
const chartOptions = {
  responsive: true,
  cutout: "70%",
};
</script>
