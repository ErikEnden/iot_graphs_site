<template>
  <div class="chart current-data-chart">
    <line-chart
      v-if="chartDataIsLoaded"
      :chartData="chartData"
      :options="opts"
    ></line-chart>
    <div class="date-selector">
      <span>Algus:</span>
      <input v-model="startDate" type="date" />
      <input v-model="startTime" type="time" />
      <br />
      <span>Lõpp:</span>
      <input v-model="endDate" type="date" />
      <input v-model="endTime" type="time" />
      <br />
    </div>
    <div>
      <textarea v-model="comment" placeholder="Kommentaar"></textarea>
    </div>
    <button @click="getChartData">Vali</button>
    <button @click="saveQuery">Salvesta</button>
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
      comment: "",
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
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
      this.chartDataIsLoaded = false;
      let self = this;
      let measurementsNone = [];
      let measurementsRed = [];
      let measurementsBlue = [];
      let measurementTimes = [];
      let reqUrl = "http://iot.ermine.ee:3000/light-level-hist?";
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
      reqUrl = reqUrl + paramArray.join("&");
      this.$http.get(reqUrl).then(function(response) {
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
          paramArray.join("and") +
          "&chartType=current&comment=" +
          this.comment
      );
    }
  }
};
</script>

<style></style>
