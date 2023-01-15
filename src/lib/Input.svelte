<script lang="ts">
  import type HypergeometricParameters from "./HypergeometricParameters";
  import NumberSpinner from "svelte-number-spinner";

  /** Input parameters for the hypergeometric distribution calculation*/
  export let params: HypergeometricParameters;

  export let onEditDragEnd = (event: any) => {};

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
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
      <span>Deck Size (N)</span>
      <NumberSpinner
        class="number-spinner"
        tabindex="0"
        type="number"
        inputmode="numeric"
        speed={spinnerSpeed}
        min="0"
        on:editend={onEditDragEnd}
        on:dragend={onEditDragEnd}
        bind:value={params.deck_size}
      />
    </label>
  </div>

  <!-- deck_success_count -->
  <div class="input-label">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
      <span>Deck Success Count (K)</span>
      <NumberSpinner
        class="number-spinner"
        type="number"
        inputmode="numeric"
        speed={spinnerSpeed}
        min="0"
        max={params.deck_size}
        on:editend={onEditDragEnd}
        on:dragend={onEditDragEnd}
        bind:value={params.deck_success_count}
      />
    </label>
  </div>

  <!-- draw_count -->
  <div class="input-label">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
      <span>Draw Count (n)</span>
      <NumberSpinner
        class="number-spinner"
        type="number"
        inputmode="numeric"
        speed={spinnerSpeed}
        min="0"
        max={params.deck_size}
        on:editend={onEditDragEnd}
        on:dragend={onEditDragEnd}
        bind:value={params.draw_count}
      />
    </label>
  </div>

  <!-- desired_success_count -->
  <div class="input-label">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
      <span>Desired Success Count (k)</span>
      <NumberSpinner
        class="number-spinner"
        type="number"
        inputmode="numeric"
        speed={spinnerSpeed}
        min="0"
        max={Math.min(params.deck_success_count, params.draw_count)}
        on:editend={onEditDragEnd}
        on:dragend={onEditDragEnd}
        bind:value={params.desired_success_count}
      />
    </label>
  </div>
</div>

<style>
  .input-label {
    display: inline-block;
  }
  .input-label label {
    display: inline;
    float: left;
    text-align: left;
    font-size: 1em;
  }

  :global(.number-spinner) {
    display: inline;
    float: right;
    box-sizing: border-box;
    text-align: right;
    width: 40%;
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
