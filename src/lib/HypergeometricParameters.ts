/**
 * Parameters for a hypergeometric distribution.
 * See https://en.wikipedia.org/wiki/Hypergeometric_distribution
 */
export default interface HypergeometricParameters {
  /**
   * The number of cards in the deck. 
   * Corresponds to hypergeometric distribution parameter 'N'.
   */
  deck_size: number;
  /**
   * The number of cards in the deck classified as successes.
   * Corresponds to hypergeometric distribution parameter 'K'.
   */
  deck_success_count: number;
  /**
   * The number of cards to draw.
   * Corresponds to hypergeometric distribution parameter 'n'.
   */
  draw_count: number;
  /**
   * The number of desired successes to draw.
   * Corresponds to hypergeometric distribution parameter 'k'.
   */
  desired_success_count: number;
}
