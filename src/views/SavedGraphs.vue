<template>
  <div class="container" v-if="chartDataIsLoaded">
    <current-data-chart-blank
      v-for="item in currentCharts"
      :key="item.id"
      :options="opts"
      :chartData="item.data"
    ></current-data-chart-blank>
    <average-data-chart-blank
      v-for="item in averageCharts"
      :key="item.id"
      :options="opts"
      :chartData="item.data"
    ></average-data-chart-blank>
  </div>
</template>

<script>
import AverageDataChartBlank from "@/components/AverageDataChartBlank.vue";
import CurrentDataChartBlank from "@/components/CurrentDataChartBlank.vue";
export default {
  components: {
    AverageDataChartBlank,
    CurrentDataChartBlank
  },
  data: function() {
    return {
      currentCharts: [],
      averageCharts: [],
      chartDataIsLoaded: false,
      chartsLoaded: 0,
      opts: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    getSavedQueries: function() {
      let self = this;
      this.$http
        .get("http://iot.ermine.ee:3000/saved-queries")
        .then(function(response) {
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            if (response.data[i].chart_type === "average") {
              self.averageCharts.push(response.data[i]);
              console.log(self.averageCharts.length);
            } else if (response.data[i].chart_type === "current") {
              self.currentCharts.push(response.data[i]);
            }
          }
          self.populateChartData();
        });
    },
    populateChartData: function() {
      console.log("hello");
      console.log(this.averageCharts.length);
      console.log(this.currentCharts.length);
      let self = this;
      for (let i = 0; i < this.averageCharts.length; i++) {
        this.averageCharts[i].query = this.averageCharts[i].query.replace(
          "and",
          "&"
        );
        console.log(this.averageCharts[i].query);
        this.$http
          .get(
            "http://iot.ermine.ee:3000/light-level-hist/all?" +
              this.averageCharts[i].query
          )
          .then(function(response) {
            self.averageCharts[i].data = response.data;
          });
        self.chartsLoaded += 1;
      }
      for (let i = 0; i < this.currentCharts.length; i++) {
        console.log(this.currentCharts[i]);
        this.currentCharts[i].query = this.currentCharts[i].query.split("and");
        console.log(this.currentCharts[i].query);
        this.currentCharts[i].query = this.currentCharts[i].query.join("&");
        this.$http
          .get(
            "http://iot.ermine.ee:3000/light-level-hist/all?" +
              this.currentCharts[i].query
          )
          .then(function(response) {
            self.currentCharts[i].data = response.data;
            console.log(self.currentCharts);
            self.chartsLoaded += 1;
          });
      }
    }
  },
  watch: {
    chartsLoaded: function(value) {
      if (value === 5) {
        this.chartDataIsLoaded = true;
      } else {
        setTimeout(function() {
          this.chartsLoaded = 5;
        }, 2000);
      }
    }
  },
  mounted: function() {
    this.getSavedQueries();
  }
};
</script>

<style></style>
