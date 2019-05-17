<template>
  <div class="container">
    <div class="chart current-data-chart">
      <line-chart
        v-if="chartDataCurrentIsLoaded"
        :chartData="chartDataCurrent"
        :options="opts"
      ></line-chart>
    </div>
    <div class="chart current-data-chart">
      <bar-chart
        v-if="chartDataAverageIsLoaded"
        :chartData="chartDataAverage"
        :options="opts"
      ></bar-chart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import Moment from "moment";
export default {
  name: "home",
  components: {
    LineChart,
    BarChart
  },
  data: function() {
    return {
      chartDataCurrent: null,
      chartDataAverage: null,
      opts: { responsive: true, maintainAspectRatio: false },
      chartDataCurrentIsLoaded: false,
      chartDataAverageIsLoaded: false
    };
  },
  methods: {
    getChartDataCurrent: function() {
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
          self.chartDataCurrent = {
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

          self.chartDataCurrentIsLoaded = true;
        });
    },
    getChartDataAverage: function() {
      const hours = [
        {
          label: "00",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "01",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "02",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "03",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "04",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "05",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "06",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "07",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "08",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "09",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "10",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "11",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "12",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "13",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "14",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "15",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "16",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "17",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "18",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "19",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "20",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "21",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "22",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        },
        {
          label: "23",
          totalBlue: 0,
          totalRed: 0,
          totalNone: 0,
          countBlue: 0,
          countRed: 0,
          countNone: 0,
          averageBlue: null,
          averageRed: null,
          averageNone: null
        }
      ];
      let parsedObjects = [];
      let self = this;
      this.$http
        .get("http://iot.ermine.ee:3000/light-level-hist/all")
        .then(function(response) {
          for (let i = 0; i < response.data.length; i++) {
            let objectToParse = {};
            let time = response.data[i].time;
            let hour = time.split("T")[1];
            hour = hour.split(":")[0];
            objectToParse.hour = hour;
            objectToParse.measurement = response.data[i].sensor_reading;
            objectToParse.filter_mode = response.data[i].sensor_filter_mode;
            parsedObjects.push(objectToParse);
          }
          let labelArr = [];
          for (let i = 0; i < hours.length; i++) {
            labelArr.push(hours[i].label);
          }
          for (let i = 0; i < parsedObjects.length; i++) {
            let itemToEdit = hours.findIndex(function(item) {
              return item.label === parsedObjects[i].hour;
            });
            if (parsedObjects[i].filter_mode === "blue") {
              hours[itemToEdit].totalBlue += parsedObjects[i].measurement;
              hours[itemToEdit].countBlue += 1;
            } else if (parsedObjects[i].filter_mode === "red") {
              hours[itemToEdit].totalRed += parsedObjects[i].measurement;
              hours[itemToEdit].countRed += 1;
            } else {
              hours[itemToEdit].totalNone += parsedObjects[i].measurement;
              hours[itemToEdit].countNone += 1;
            }
          }
          for (let i = 0; i < hours.length; i++) {
            hours[i].averageBlue = hours[i].totalBlue / hours[i].countBlue;
            hours[i].averageRed = hours[i].totalRed / hours[i].countRed;
            hours[i].averageNone = hours[i].totalNone / hours[i].countNone;
          }
          let avgArrayBlue = [];
          let avgArrayRed = [];
          let avgArrayNone = [];
          for (let i = 0; i < hours.length; i++) {
            avgArrayBlue.push(hours[i].averageBlue);
            avgArrayRed.push(hours[i].averageRed);
            avgArrayNone.push(hours[i].averageNone);
          }
          self.chartDataAverage = {
            labels: labelArr,
            datasets: [
              {
                label: "Blue filter",
                backgroundColor: "rgba(25, 181, 254, 0.5)",
                data: avgArrayBlue
              },
              {
                label: "Red filter",
                backgroundColor: "rgba(214, 69, 65, 0.5)",
                data: avgArrayRed
              },
              {
                label: "No filter",
                backgroundColor: "rgba(233, 212, 96, 0.5)",
                data: avgArrayNone
              }
            ]
          };
          self.chartDataAverageIsLoaded = true;
        });
    }
  },
  mounted: function() {
    this.getChartDataCurrent();
    this.getChartDataAverage();
  }
};
</script>
<style lang="scss">
.chart {
  width: 100vh;
}
</style>
