<template>
  <canvas ref="barChart" style="height: 400px"></canvas>
</template>

<script>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "BarChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const barChart = ref(null);

    onMounted(() => {
      new Chart(barChart.value, {
        type: "bar",
        data: {
          labels: props.labels,
          datasets: [
            {
              label: "불량 현황",
              data: props.data,
              backgroundColor: ["#ff6384", "#36a2eb"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    });

    return { barChart };
  },
};
</script>
