<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
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
