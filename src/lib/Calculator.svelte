<script lang="ts">
  import Input from "./CalculatorInput.svelte";
  import Output from "./CalculatorOutput.svelte";
  import type HypergeometricParams from "./HypergeometricParameters";

  export let params: HypergeometricParams;
  export let onParamsChange: (params: HypergeometricParams) => void = (_) => {};
</script>

<!--
@component
CardGameCalculator Component

- Usage:
  ```tsx
  const params: HypergeometricParameters = {
    deck_size: 12,
    deck_success_count: 4,
    draw_count: 4,
    desired_success_count: 2,
  };
  <CardGameCalculator {params} />
  ```
-->
<div>
  <Input
    bind:params
    onEditDragEnd={(_) => {
      onParamsChange(params);
    }}
  />
  <Output {params} />
</div>

<style>
</style>
