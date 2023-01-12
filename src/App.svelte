<script lang="ts">
  import Input from "./lib/Input.svelte";
  import Output from "./lib/Output.svelte";
  import type HypergeometricParams from "./lib/HypergeometricParameters";

  let params: HypergeometricParams = {
    deck_size: 12,
    deck_success_count: 3,
    draw_count: 4,
    desired_success_count: 2,
  };
</script>

<main>
  <div class="header-container">
    <h1>Card Game Calculator</h1>
    <h4>
      A <a href="https://en.wikipedia.org/wiki/Hypergeometric_distribution"
        >hypergeometric distribution</a
      > calculator
    </h4>
  </div>
  <div class="card">
    <div class="input-container">
      <Input bind:params />
    </div>
    <div class="output-container">
      <Output {params} />
    </div>
  </div>
</main>

<style>
  .header-container {
    line-height: 0.2em;
  }
  .card {
    padding: 1em;
    max-width: 320px;
    width: 320px;
  }
  .input-container {
    max-width: 100%;
    width: 100%;
  }
  .output-container {
    max-width: 100%;
    width: 100%;
  }
</style>
