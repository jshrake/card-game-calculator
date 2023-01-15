<script lang="ts">
  import type HypergeometricParameters from "./HypergeometricParameters";
  import NumberSpinner from "svelte-number-spinner";

  /** Input parameters for the hypergeometric distribution calculation*/
  export let params: HypergeometricParameters;

  // Restrict input values to be within the bounds of the other inputs
  $: {
    // deck_success_count must be less than or equal to the number of cards in the deck
    params.deck_success_count = Math.max(
      0,
      Math.min(params.deck_success_count, params.deck_size)
    );
    // draw_count must be less than or equal to the number of cards in the deck
    params.draw_count = Math.max(
      0,
      Math.min(params.draw_count, params.deck_size)
    );
    // desired_success_count must be less than or equal to draw_count and the number of successes in the deck
    params.desired_success_count = Math.max(
      0,
      Math.min(
        Math.min(params.desired_success_count, params.deck_success_count),
        params.draw_count
      )
    );
  }

  const spinnerSpeed = 0.1;
</script>

<!--
@component
Input Component

- Usage:
  ```tsx
  const params: HypergeometricParameters = {
    deck_size: 12,
    deck_success_count: 4,
    draw_count: 4,
    desired_success_count: 2,
  };
  <Input {params}>
  ```
-->
<div class="input-container">
  <!-- deck_size -->
  <div class="input-label">
    <label for="deck_size_input"> Deck Size (N) </label>
    <NumberSpinner
      class="number-spinner"
      id="deck_size_input"
      tabindex="0"
      type="number"
      inputmode="numeric"
      name="deck_size"
      speed={spinnerSpeed}
      min="0"
      bind:value={params.deck_size}
    />
  </div>

  <!-- deck_success_count -->
  <div class="input-label">
    <label for="deck_success_count_input"> Deck Success Count (K) </label>
    <NumberSpinner
      class="number-spinner"
      id="deck_success_count_input"
      type="number"
      inputmode="numeric"
      name="deck_success_count"
      speed={spinnerSpeed}
      min="0"
      max={params.deck_size}
      bind:value={params.deck_success_count}
    />
  </div>

  <!-- draw_count -->
  <div class="input-label">
    <label for="draw_count_input"> Draw Count (n) </label>
    <NumberSpinner
      class="number-spinner"
      id="draw_count_input"
      type="number"
      inputmode="numeric"
      name="draw_count"
      speed={spinnerSpeed}
      min="0"
      max={params.deck_size}
      bind:value={params.draw_count}
    />
  </div>

  <!-- desired_success_count -->
  <div class="input-label">
    <label for="desired_success_count_input"> Desired Success Count (k) </label>
    <NumberSpinner
      id="desired_success_count_input"
      class="number-spinner"
      type="number"
      inputmode="numeric"
      name="desired_success_count"
      speed={spinnerSpeed}
      min="0"
      max={params.draw_count}
      bind:value={params.desired_success_count}
    />
  </div>
</div>

<style>
  .input-label {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
  }
  .input-label label {
    text-align: left;
    font-size: 1em;
  }

  :global(.number-spinner) {
    display: inline-block;
    box-sizing: border-box;
    text-align: right;
    width: 100%;
    font-size: 1.2em;
    font-weight: bold;
  }
  :global(.number-spinner):focus {
    cursor: default;
  }
  :global(.number-spinner) {
    cursor: default;
  }
  :global(.number-spinner) {
    cursor: default;
  }
  :global(.number-spinner) {
    cursor: default;
  }
</style>
