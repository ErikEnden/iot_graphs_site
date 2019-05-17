<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data: function() {
    return {};
  },
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
