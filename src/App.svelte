<script lang="ts">
  import type HypergeometricParams from "./lib/HypergeometricParameters";
  import CardGameCalculator from "./lib/Calculator.svelte";

  import githubLogo from "./assets/github.svg";
  import mastodonLogo from "./assets/mastodon.svg";
  import kofiLogo from "./assets/kofi.svg";

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
  <div class="header">
    <h1>
      {game_title} Calculator
    </h1>
    <h2>
      Calculate the probability to draw cards using the <a
        href="https://en.wikipedia.org/wiki/Hypergeometric_distribution"
        >hypergeometric distribution</a
      >
    </h2>
  </div>
  <div class="calculator-container">
    <CardGameCalculator
      bind:params
      onParamsChange={(params) => {
        set_url_params_from_hyper_params(params);
      }}
    />
  </div>
  <div class="footer">
    <a
      href="https://github.com/jshrake/card-game-calculator"
      target="_blank"
      rel="noreferrer"
    >
      <img class="svg-logo" alt="GitHub Logo" src={githubLogo} />
    </a>
    <a href="https://mastodon.social/@jshrake" target="_blank" rel="noreferrer">
      <img class="svg-logo" alt="Mastodon Logo" src={mastodonLogo} />
    </a>
    <a href="https://ko-fi.com/jshrake" target="_blank" rel="noreferrer">
      <img class="svg-logo" alt="Ko-fi Logo" src={kofiLogo} />
    </a>
  </div>
</main>

<style>
  .header {
    line-height: 1em;
    padding-bottom: 1em;
  }

  .header h1 {
    font-size: 1.75em;
    font-weight: bolder;
    margin: 0;
  }

  .header h2 {
    font-size: 1em;
    font-weight: normal;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 1em;
  }

  .svg-logo {
    width: 3em;
    padding: 1em;
  }

  @media (prefers-color-scheme: dark) {
    .svg-logo {
      filter: invert(100%);
    }
  }
</style>
