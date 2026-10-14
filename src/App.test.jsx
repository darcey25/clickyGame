import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

it("renders all 12 cards", () => {
  render(<App />);
  expect(screen.getAllByRole("img", { name: /^(?!logo)/ })).toHaveLength(12);
});

it("scores a new card and resets on a repeat click", () => {
  render(<App />);
  fireEvent.click(screen.getByAltText("goku"));
  expect(screen.getByText("Good Guess!")).toBeTruthy();
  expect(screen.getByText(/points: 1 \| high score: 1/)).toBeTruthy();

  fireEvent.click(screen.getByAltText("goku"));
  expect(screen.getByText(/better luck next time/)).toBeTruthy();
  expect(screen.getByText(/points: 0 \| high score: 1/)).toBeTruthy();
});
