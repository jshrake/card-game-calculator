<script lang="ts">
  import hypergeometric_pmf from "@stdlib/stats-base-dists-hypergeometric-pmf";

  import type HypergeometricParameters from "./HypergeometricParameters";
  import OutputChart from "./CalculatorOutputChart.svelte";

  /** Input parameters for the hypergeometric distribution calculation*/
  export let params: HypergeometricParameters;

  // Calculate the PMF for each possible value of k
  $: value_pmf_list = range(0, params.draw_count)
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

  // Calculate the probability to draw at least params.desired_success_count in params.draw_count draws
  // from a deck of params.deck_size cards that contains params.deck_success_count successes.
  // One way to do this is to sum all PMF values greater than or equal to params.desired_success_count.
  // Another way is to use the CDF function, but we already have all the PMF values calculate for the OutputChart.
  $: answer = value_pmf_list
    .filter(([value, _]) => value >= params.desired_success_count)
    .reduce((sum, [_, pmf]) => sum + pmf, 0.0);

  // Format the answer as a percentage with 2 decimal places
  $: answer_as_pct = `${(100.0 * answer).toFixed(2)}%`;

  /** Returns the pluralized form of a noun if count is not 1. */
  const pluralize = (count: number, noun: string, suffix = "s") =>
    `${noun}${count !== 1 ? suffix : ""}`;

  /** Convenience function for returning an array of values between [start, end)*/
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
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
  <p data-testid="answer-explain" class="answer-context">
    Probability to draw at least <span class="emphasize">{params.desired_success_count}</span>
    {pluralize(params.desired_success_count, "success", "es")} in <span class="emphasize">{params.draw_count}</span> {pluralize(params.draw_count, "draw", "s")} 
    from a deck of <span class="emphasize">{params.deck_size}</span>
    {pluralize(params.deck_size, "card", "s")} that contains <span class="emphasize">{params.deck_success_count}</span>
    {pluralize(params.deck_success_count, "success", "es")}
  </p>

  <p data-testid="answer-result" class="answer-as-pct">{answer_as_pct}</p>

  <OutputChart
    {value_pmf_list}
    desired_success_count={params.desired_success_count}
  />
</div>

<style>
  .emphasize {
    font-weight: bold;
    font-size: 1.2em;
  }
  .answer-context {
    font-size: 1.1em;
    text-align: center;
  }
  .answer-as-pct {
    font-size: 4em;
    font-weight: bold;
    line-height: 0.1em;
    color: orange;
    margin: 0.75em;
  }
</style>
