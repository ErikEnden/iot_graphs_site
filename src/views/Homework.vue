<template>
  <div class="homework">
    <div class="homework-1">
      <h1>Kodutöö 1</h1>
      <p>Hetkestaatus: {{ ledStatus }}</p>
      <button @click="toggleLed">Lülita</button>
    </div>
    <div class="homework-2">
      <h1>Kodutöö 2</h1>
      <line-chart v-if="dataIsLoaded" :chartData="chartData" :options="opts">
      </line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import Moment from "moment";
export default {
  components: {
    LineChart
  },
  data: function() {
    return {
      ledStatus: "",
      measurements: [],
      times: [],
      chartData: null,
      dataIsLoaded: false,
      opts: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true // minimum value will be 0.
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    getData: function() {
      let self = this;
      this.$http.get("http://iot.ermine.ee:3002/hist").then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
          self.measurements.push(response.data[i].measurement);
          self.times.push(
            Moment(response.data[i].time).format("D/M/YYYY HH:mm:ss")
          );
        }
        self.measurements.reverse();
        self.times.reverse();
        self.chartData = {
          labels: self.times,
          datasets: [
            {
              label: "Temperature (Celsius)",
              backgroundColor: "#59abe3",
              data: self.measurements
            }
          ]
        };
        self.dataIsLoaded = true;
      });
    },
    getLedState: function() {
      let self = this;
      this.$http.get("http://iot.ermine.ee:3003/").then(function(response) {
        if (response.data === true) {
          self.ledStatus = "sees";
        } else {
          self.ledStatus = "väljas";
        }
      });
    },
    toggleLed: function() {
      let self = this;
      this.$http
        .get("http://iot.ermine.ee:3003/toggle")
        .then(function(response) {
          if (response.data === true) {
            self.ledStatus = "sees";
          } else {
            self.ledStatus = "väljas";
          }
        });
    }
  },
  mounted: function() {
    this.getData();
    this.getLedState();
  }
};
</script>

<style></style>
