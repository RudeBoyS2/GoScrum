import Donate from "./Donate";
import { render, screen } from "@testing-library/react";

it("renders a heading", () => {
  render(<Donate />);

  expect(screen.getByRole("heading")).toBeInTheDocument();
});

it("renders a button", () => {
  render(<Donate />);

  expect(screen.getByRole("button")).toBeInTheDocument();
});

it("the button should have 'Donar' as innerText", () => {
  render(<Donate />);

  expect(screen.getByRole("button")).toHaveTextContent("Donar");
});
