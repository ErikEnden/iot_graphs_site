<template>
  <div class="chart current-data-chart">
    <line-chart
      v-if="chartDataIsLoaded"
      :chartData="chartData"
      :options="opts"
    ></line-chart>
    <div class="date-selector">
      <input type="date" />
      <input type="time" />
    </div>
    <a id="line-chart-download" href="" download=""
      ><button>Salvesta</button></a
    >
  </div>
</template>

<script>
import Moment from "moment";
import LineChart from "@/components/LineChart.vue";
export default {
  components: {
    LineChart
  },
  data: function() {
    return {
      chartData: null,
      chartDataIsLoaded: false,
      opts: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: function() {
    this.getChartData();
  },
  methods: {
    getChartData: function() {
      let self = this;
      let measurementsNone = [];
      let measurementsRed = [];
      let measurementsBlue = [];
      let measurementTimes = [];
      this.$http
        .get("http://iot.ermine.ee:3000/light-level-hist")
        .then(function(response) {
          for (let i = 0; i < response.data.length; i++) {
            let filter = response.data[i].sensor_filter_mode;
            let payload = response.data[i].sensor_reading;
            if (filter == "none") {
              measurementsNone.push(payload);
              measurementTimes.push(
                Moment(response.data[i].time).format("D/M/YYYY HH:mm:ss")
              );
            } else if (filter == "red") {
              measurementsRed.push(payload);
            } else if (filter == "blue") {
              measurementsBlue.push(payload);
            }
          }
          measurementsNone.reverse();
          measurementTimes.reverse();
          measurementsRed.reverse();
          measurementsBlue.reverse();
          self.chartData = {
            labels: measurementTimes,
            datasets: [
              {
                label: "Blue filter",
                backgroundColor: "rgba(25, 181, 254, 0.5)",
                data: measurementsBlue
              },
              {
                label: "Red filter",
                backgroundColor: "rgba(214, 69, 65, 0.5)",
                data: measurementsRed
              },
              {
                label: "No filter",
                backgroundColor: "rgba(233, 212, 96, 0.5)",
                data: measurementsNone
              }
            ]
          };

          self.chartDataIsLoaded = true;
        });
    }
  }
};
</script>

<style></style>
