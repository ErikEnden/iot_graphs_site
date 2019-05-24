<template>
  <div class="chart current-data-chart">
    <line-chart
      v-if="chartDataIsLoaded"
      :chartData="chartData"
      :options="opts"
    ></line-chart>
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
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      chartDataIsLoaded: false,
      opts: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  props: {
    chartData: {
      type: Array,
      default: null
    },
    comment: {
      type: String,
      default: ""
    }
  },
  mounted: function() {
    this.formatChartData();
  },
  methods: {
    formatChartData: function() {
      console.log(this.chartData);
      this.chartDataIsLoaded = false;
      let self = this;
      let measurementsNone = [];
      let measurementsRed = [];
      let measurementsBlue = [];
      let measurementTimes = [];
      console.log(this.chartData);
      for (let i = 0; i < this.chartData.length; i++) {
        let filter = this.chartData[i].sensor_filter_mode;
        let payload = this.chartData[i].sensor_reading;
        if (filter == "none") {
          measurementsNone.push(payload);
          measurementTimes.push(
            Moment(this.chartData[i].time).format("D/M/YYYY HH:mm:ss")
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
    },
    saveQuery: function() {
      let paramArray = [];
      if (this.startDate != null && this.endDate != null) {
        paramArray.push("perPage=99999");
      }
      if (this.startDate != null && this.startDate != "") {
        paramArray.push("startDate=" + this.startDate);
        if (this.startTime != null && this.startTime != "") {
          paramArray.push("startTime=" + this.startTime);
        }
      }
      if (this.endDate != null && this.endDate != "") {
        paramArray.push("endDate=" + this.endDate);
        if (this.endTime != null && this.endTime != "") {
          paramArray.push("endTime=" + this.endTime);
        }
      }
      this.$http.post(
        "http://iot.ermine.ee:3000/save-query?queryString=" +
          "'" +
          paramArray.join("&") +
          "'" +
          "&chartType=current"
      );
    }
  }
};
</script>

<style></style>
