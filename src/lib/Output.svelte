<script lang="ts">
  import "charts.css";
  import type HypergeometricParameters from "./HypergeometricParameters";
  import hypergeometric_cdf from "@stdlib/stats-base-dists-hypergeometric-cdf";
  import hypergeometric_pmf from "@stdlib/stats-base-dists-hypergeometric-pmf";

  /** Input parameters for the hypergeometric distribution calculation*/
  export let params: HypergeometricParameters;
  $: p =
    hypergeometric_pmf(
      params.desired_success_count,
      params.deck_size,
      params.deck_success_count,
      params.draw_count
    ) +
    (1.0 -
      hypergeometric_cdf(
        params.desired_success_count,
        params.deck_size,
        params.deck_success_count,
        params.draw_count
      ));
  $: value = `${(100.0 * p).toFixed(2)}%`;

  $: val_pmf = range(0, params.draw_count)
    .map((k) => [
      k,
      hypergeometric_pmf(
        k,
        params.deck_size,
        params.deck_success_count,
        params.draw_count
      ) || 0.0,
    ])
    // Filter out near-zero probabilities
    .filter(([_, p]) => p > 1e-6);
  $: max_pmf = val_pmf.reduce((max, [_, p]) => Math.max(max, p), 0.0);
  $: val_pmf_scale = val_pmf.map(([k, p]) => [k, p, p / max_pmf]);

  // Other utils
  const pluralize = (count: number, noun: string, suffix = "s") =>
    `${noun}${count !== 1 ? suffix : ""}`;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const label_font_size = (k: number) => {
    if (k < 10) {
      return "1.0em";
    } else if (k < 20) {
      return "0.75em";
    } else {
      return "0.5em";
    }
  };
</script>

<!--
  @component
  Output Component
  
  - Usage:
    ```tsx
    const params: HypergeometricParameters = {
      deck_size: 5,
      deck_success_count: 3,
      draw_count: 4,
      desired_success_count: 1,
    };
    <Output {params}>
    ```
-->
<div class="output-container">
  <!-- prettier-ignore -->
  <p class="human-result">
    Probability to draw at least <span class="emphasize">{params.desired_success_count}</span>
    {pluralize(params.desired_success_count, "success", "es")} in <span class="emphasize">{params.draw_count}</span> {pluralize(params.draw_count, "draw", "s")} 
    from a deck of <span class="emphasize">{params.deck_size}</span>
    {pluralize(params.deck_size, "card", "s")} that contains <span class="emphasize">{params.deck_success_count}</span>
    {pluralize(params.deck_success_count, "success", "es")}
  </p>
  <p class="raw-result">{value}</p>
  <table
    class="charts-css column show-labels hide-data show-primary-axis data-spacing-3"
    style={`font-size: ${label_font_size(val_pmf_scale.length)};`}
  >
    <caption>Hypergeometric Probability Distribution</caption>
    <thead><tr><th>Successes (k)</th> <th>Probability</th></tr></thead>
    <tbody>
      {#each val_pmf_scale as [k, pmf, scale], i}
        <tr>
          <th scope="row">{k}</th>
          <td
            style={`--size: ${scale}; --color: ${
              k >= params.desired_success_count
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
</div>

<style>
  .emphasize {
    font-weight: bold;
    font-size: 1.2em;
  }
  .human-result {
    font-size: 1.1em;
    text-align: center;
  }
  .raw-result {
    font-size: 4em;
    font-weight: bold;
    line-height: 0.1em;
    color: orange;
    margin: 0.75em;
  }
  table {
    width: 100%;
    height: 200px;
    max-width: 100%;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
