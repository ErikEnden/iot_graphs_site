<template>
  <div class="container">
    <other-data-chart :filename="'humidity-temperature.json'" />
    <other-data-chart :filename="'moist-dirt-temperature.json'" />
  </div>
</template>

<script>
// @ is an alias to /src

import OtherDataChart from "@/components/OtherDataChart.vue";

export default {
  name: "home",
  components: {
    OtherDataChart
  },
  data: function() {
    return {
      chartDataAverage: null,
      opts: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartDataCurrentIsLoaded: true
    };
  }
};
</script>
<style lang="scss">
.chart {
  width: 100vh;
}
</style>
