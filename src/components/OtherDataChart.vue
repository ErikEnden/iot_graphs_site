<template>
  <div class="chart other-data-chart">
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
  props: {
    filename: {
      type: String,
      default: ""
    }
  },
  mounted: function() {
    this.getChartData();
  },
  methods: {
    getChartData: function() {
      let measurementsTemp = [];
      let measurementsMoisture = [];
      let measurementTimes = [];
      let self = this;
      this.chartDataIsLoaded = false;
      console.log(this.filename);
      if (this.filename === "moist-dirt-temperature.json") {
        this.$http.get(this.filename).then(function(response) {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            measurementsTemp.push(response.data[i].temperatuur);
            measurementsMoisture.push(response.data[i].mullaniiskus);
            measurementTimes.push(
              Moment(response.data[i].kuupäev).format("D/M/YYYY HH:mm:ss")
            );
          }
          self.chartData = {
            labels: measurementTimes,
            datasets: [
              {
                label: "Temperatuur",
                backgroundColor: "rgba(25, 181, 254, 0.5)",
                data: measurementsTemp
              },
              {
                label: "Niiskus",
                backgroundColor: "rgba(214, 69, 65, 0.5)",
                data: measurementsMoisture
              }
            ]
          };
          self.chartDataIsLoaded = true;
        });
      } else if (this.filename === "humidity-temperature.json") {
        this.$http.get(this.filename).then(function(response) {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            measurementsTemp.push(response.data[i].temperature);
            measurementsMoisture.push(response.data[i].humidity);
            measurementTimes.push(
              Moment(response.data[i].date).format("D/M/YYYY HH:mm:ss")
            );
          }
          self.chartData = {
            labels: measurementTimes,
            datasets: [
              {
                label: "Temperatuur",
                backgroundColor: "rgba(25, 181, 254, 0.5)",
                data: measurementsTemp
              },
              {
                label: "Niiskus",
                backgroundColor: "rgba(214, 69, 65, 0.5)",
                data: measurementsMoisture
              }
            ]
          };
          self.chartDataIsLoaded = true;
        });
      }

      /*
      
      let self = this;
      let humidity = [];
      let temperature = [];
      let measurementTimes = [];
      let reqUrl = "@/assets/humidity-temperature.json";
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
          temperature.push(response.data[i].temperature);
          humidity.push(response.data[i].humidity);
          measurementTimes.push(
            Moment(response.data[i].time).format("D/M/YYYY HH:mm:ss")
          );
        }
        measurementTimes.reverse();
        temperature.reverse();
        humidity.reverse();
        self.chartData = {
          labels: measurementTimes,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: "rgba(25, 181, 254, 0.5)",
              data: temperature
            },
            {
              label: "Humidity",
              backgroundColor: "rgba(214, 69, 65, 0.5)",
              data: humidity
            }
          ]
        };

        self.chartDataIsLoaded = true;
        */
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
          "&chartType=other"
      );
    }
  }
};
</script>

<style></style>
