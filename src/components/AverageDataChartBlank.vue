<template>
  <div class="chart average-data-chart" v-if="chartDataIsLoaded">
    <div class="comment">
      {{ comment }}
    </div>
    <bar-chart
      v-if="chartDataIsLoaded"
      :chartData="chartData"
      :options="opts"
    ></bar-chart>
    <hr />
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
export default {
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
  components: {
    BarChart
  },
  methods: {
    changeTime: function() {
      console.log(this.startDate);
      console.log(this.startTime);
      console.log(this.endDate);
      console.log(this.endTime);
    },
    saveQuery: function() {
      let paramArray = [];
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
          paramArray.join("&") +
          "&chartType=average"
      );
    },
    formatChartData: function() {
      console.log(this.chartData);
      this.chartDataIsLoaded = false;
      const hours = [
        {
          label: "00"
        },
        {
          label: "01"
        },
        {
          label: "02"
        },
        {
          label: "03"
        },
        {
          label: "04"
        },
        {
          label: "05"
        },
        {
          label: "06"
        },
        {
          label: "07"
        },
        {
          label: "08"
        },
        {
          label: "09"
        },
        {
          label: "10"
        },
        {
          label: "11"
        },
        {
          label: "12"
        },
        {
          label: "13"
        },
        {
          label: "14"
        },
        {
          label: "15"
        },
        {
          label: "16"
        },
        {
          label: "17"
        },
        {
          label: "18"
        },
        {
          label: "19"
        },
        {
          label: "20"
        },
        {
          label: "21"
        },
        {
          label: "22"
        },
        {
          label: "23"
        }
      ];
      let parsedObjects = [];
      let self = this;
      for (let i = 0; i < hours.length; i++) {
        hours[i].totalBlue = 0;
        hours[i].totalRed = 0;
        hours[i].totalNone = 0;
        hours[i].countBlue = 0;
        hours[i].countRed = 0;
        hours[i].countNone = 0;
      }
      for (let i = 0; i < this.chartData.length; i++) {
        let objectToParse = {};
        let time = this.chartData[i].time;
        let hour = time.split("T")[1];
        hour = hour.split(":")[0];
        objectToParse.hour = hour;
        objectToParse.measurement = this.chartData[i].sensor_reading;
        objectToParse.filter_mode = this.chartData[i].sensor_filter_mode;
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
      self.chartData = {
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
      console.log();
      self.chartDataIsLoaded = true;
    }
  },
  mounted: function() {
    this.formatChartData();
  }
};
</script>

<style></style>
