// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/svelte";

import Calculator from "../lib/Calculator.svelte";
import type HypergeometricParameters from "../lib/HypergeometricParameters";

test("Calculates an expected answer", () => {
  const params: HypergeometricParameters = {
    deck_size: 39,
    deck_success_count: 20,
    draw_count: 25,
    desired_success_count: 13,
  };
  render(Calculator, { params });
  const result = screen.getByTestId("answer-result");
  expect(result).toBeInTheDocument();
  expect(result).toHaveTextContent("58.42%");

  const explain = screen.getByTestId("answer-explain");
  expect(explain).toBeInTheDocument();
  expect(explain).toHaveTextContent(
    "Probability to draw at least 13 successes in 25 draws from a deck of 39 cards that contains 20 successes"
  );
});
