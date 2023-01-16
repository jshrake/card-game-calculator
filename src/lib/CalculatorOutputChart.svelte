<script lang="ts">
  import "charts.css";

  // A List of [value, pmf] pairs
  export let value_pmf_list: number[][];
  export let desired_success_count: number;

  $: max_pmf = value_pmf_list.reduce((max, [_, p]) => Math.max(max, p), 0.0);

  /** The chart label font size is a function of the number of columns in the chart*/
  const label_font_size = (column_count: number) => {
    if (column_count < 10) {
      return "1.0em";
    } else if (column_count < 20) {
      return "0.75em";
    } else {
      return "0.5em";
    }
  };
</script>

<!--
    @component
    OutputChart Component
  -->
<table
  class="charts-css column show-labels hide-data show-primary-axis data-spacing-3"
  style={`font-size: ${label_font_size(value_pmf_list.length)};`}
>
  <caption>Hypergeometric Probability Distribution</caption>
  <thead><tr><th>Successes (k)</th> <th>Probability</th></tr></thead>
  <tbody>
    {#each value_pmf_list as [value, pmf] (value)}
      <tr>
        <th scope="row">{value}</th>
        <td
          style={`--size: ${pmf / max_pmf}; --color: ${
            // TODO(jshrake): Hardcoded colors, need to define in app.css instead
            value >= desired_success_count
              ? "orange"
              : "rgba(100,108,255, 0.5) "
          }`}
        >
          <span class="data">{pmf}</span>
          <span class="tooltip">{(100.0 * pmf).toFixed(2)}%</span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    height: 200px;
    max-width: 100%;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
