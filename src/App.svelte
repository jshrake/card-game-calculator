<script lang="ts">
  import type HypergeometricParams from "./lib/HypergeometricParameters";
  import CardGameCalculator from "./lib/Calculator.svelte";

  /**
   * Default hypergeometric parameters for different popular card games.
   */
  const defaultParams: Record<string, [string, HypergeometricParams]> = {
    "/": [
      "Card Game",
      {
        deck_size: 12,
        deck_success_count: 3,
        draw_count: 4,
        desired_success_count: 2,
      },
    ],
    "/hearthstone": [
      "Hearthstone",
      {
        deck_size: 30,
        deck_success_count: 2,
        draw_count: 3,
        desired_success_count: 1,
      },
    ],
    "/snap": [
      "Marvel Snap",
      {
        deck_size: 12,
        deck_success_count: 2,
        draw_count: 4,
        desired_success_count: 1,
      },
    ],
    "/magic": [
      "Magic: The Gathering",
      {
        deck_size: 60,
        deck_success_count: 4,
        draw_count: 7,
        desired_success_count: 1,
      },
    ],
  };
  const pathname = window.location.pathname || "/";
  let [game_title, params] = defaultParams[pathname] || defaultParams["/"];

  const HG_N = "N";
  const HG_K = "K";
  const HG_n = "n";
  const HG_x = "k";

  /**
   * Sets the hypergeometric parameters based on the URL parameters.
   */
  const set_hyper_params_from_url_params = (url_params: URLSearchParams) => {
    params.deck_size = parseInt(url_params.get(HG_N)) || params.deck_size;
    params.deck_success_count =
      parseInt(url_params.get(HG_K)) || params.deck_success_count;
    params.draw_count = parseInt(url_params.get(HG_n)) || params.draw_count;
    params.desired_success_count =
      parseInt(url_params.get(HG_x)) || params.desired_success_count;
    params = params;
  };

  /**
   *
   * Sets the URL parameters using window.history.replaceState
   * based on the current hypergeometric parameters.
   *
   * @param params: Hypergeometric parameters to set in the URL
   */
  const set_url_params_from_hyper_params = (params: HypergeometricParams) => {
    if (!window.location.pathname) {
      return;
    }
    const url_params = new URLSearchParams();
    url_params.set(HG_N, params.deck_size.toString());
    url_params.set(HG_K, params.deck_success_count.toString());
    url_params.set(HG_n, params.draw_count.toString());
    url_params.set(HG_x, params.desired_success_count.toString());
    // Ignore any errors that might occur when setting the URL
    try {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${url_params.toString()}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Set the hypergeometric parameters the very first time the page is loaded
  const url_params = new URLSearchParams(window.location.search);
  set_hyper_params_from_url_params(url_params);
  // And set the URL parameters based on the hypergeometric parameters the first time the page is loaded
  // This handles the case that the user has no URL parameters set
  set_url_params_from_hyper_params(params);
</script>

<main>
  <div class="header-container">
    <h1>
      {game_title} Calculator
      <a href="https://github.com/jshrake/card-game-calculator"
        ><img
          class="github-logo"
          alt="Github Logo, Link to Source Code"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD4klEQVRoQ+2YjVEUQRCFuQjUCDwiECJwiUCJwCMCJQLPCMQIPCIAIxAiECPwiECN4HzfVi+1zPb87N6cFFV01dTB7kzPez39Nzvbe+Qye+T4954IPPQJVjuBzWZzIDKvNRqNuQb/9+VG//zRuGLMZrPrGuS3IiDQzwXivcbCQI/BtNbkS40vIsPfk2QSAQP+UTt+mLTrcNFKj05FhBMaJaMJCPxb7fBVA+vXFMBDAjLFMoqAwH+uaPUYyJVInJQyKCYg8Fh9Uap4y3lXWn9c4lJFBP4z+I47meooZ4gsAYFfSgkB+xCSdackAYFvhPq7g/xczwg23uNWLyey+2t6SKckB1JyKCepwI4SsFT5Q9rmjtIjKcVPW9FcSJxpPLNHP/UbpkSy1it7D/CldLCm08E+v5y90LMfi4cUgaUWuq4jZYN1RvigT8wBA9lGz288QHq38dbo2bnmY6SBuAQMDNZwc71HILLxqMcJAujhFNahwhgBKiw5PyYvSlLcKPSanCFAyzGo/DEC+H7YjPXx3IuBsUAjrsV+7BuTtQjsZ09AVphrkhdM3dpvUkTGqC7am6D2MlG318BwXjAuNJuqGxPXF2uwsdhbS1eXzUK1n2S8Zf+hRyBlhZ1ZvwMlEiv9/S5ikMH+HoErLeZi4snAAjUs39dh3e5FRC/p9zB3AikCNFhUzZ1Jovq3e4Yp3DsBAngeQZgs6zVY1SDA3bUr+dkgqgF6hAsVnUDKhdxiUpNEpvu9lQvd846xQTwIoprg0SUCxNibiN5rEWhyQZwrJruuA78TRilKo1TZWBpDd7Qz3PY0Ci5PXPrvWvA2K4WbWjVMWYEl1dOpfRjj8pT62nEoAiSZO4k1c6lAZjGXDFJqlZpgqZNTT4EfBLB7AhZIC/32+6FbAx2m15WeU53XU9zHGkcuTeyXk4H7RAkYCazcNVWXAnls7oXVw1aDY+XU+CXQwutkC87Wk2FonRv7zQHnPVfQuac3daUMLzWA6z5zANYrdtyFm9RlRyRYG+u1YmSiPVjuq0RYldsMZAEHkLDtdY+5jyrTrHkEcF/u2u6p5gh4t6S2DhiJpbkCyiHEl4Z1zicyV8dw+ZF0otuVkg9bC63sB3QbDzmQqfcjCGTb9ywBgDhXvTOROJ1KopBAUcEsIhAhgatQFbvCQpbgi11WCggUgWejYgJGInSne2BFoEhfhkA2EfQ3Ldqwv8CCd6VngzS6JQGyzSIVsN7RjibQKRER6sRS4y6VTiRAkSKm0DVaJhPoEcGtGNyWmhIEVszoe4ghspqb40t0bU2gZJNdznkisEvrluh+OoESK+1yzj962JFAHBp1LQAAAABJRU5ErkJggg=="
        />
      </a>
    </h1>
    <h2>
      A <a href="https://en.wikipedia.org/wiki/Hypergeometric_distribution"
        >hypergeometric distribution</a
      > calculator
    </h2>
  </div>
  <CardGameCalculator
    bind:params
    onParamsChange={(params) => {
      set_url_params_from_hyper_params(params);
    }}
  />
</main>

<style>
  .header-container {
    line-height: 0.2em;
    padding-bottom: 0.5em;
  }

  .github-logo {
    width: 1em;
    text-align: end;
  }

  @media (prefers-color-scheme: light) {
    .github-logo {
      filter: invert(100%);
    }
  }
</style>
