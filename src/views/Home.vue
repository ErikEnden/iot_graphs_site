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
  },
  methods: {
    generateChartDownloadLinks: function() {
      let downloadLink = document.getElementById("line-chart-download");
      downloadLink.href = "asd";
      downloadLink.download = "sfad.png";
    }
  },
  mounted: function() {
    this.getChartDataAverage();
  }
};
</script>
<style lang="scss">
.chart {
  width: 100vh;
}
</style>
