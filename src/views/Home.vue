<template>
  <div class="container">
    <current-data-chart> </current-data-chart>
    <average-data-chart></average-data-chart>
  </div>
</template>

<script>
// @ is an alias to /src

import CurrentDataChart from "@/components/CurrentDataChart.vue";
import AverageDataChart from "@/components/AverageDataChart.vue";

export default {
  name: "home",
  components: {
    CurrentDataChart,
    AverageDataChart
  },
  data: function() {
    return {
      chartDataAverage: null,
      opts: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartDataCurrentIsLoaded: false,
      chartDataAverageIsLoaded: false
    };
  }
};
</script>
<style lang="scss">
.chart {
  width: 100vh;
}
</style>
