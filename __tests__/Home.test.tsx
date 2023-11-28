import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from "@/app/page";

describe("Home component", () => {
  test("renders welcome message", () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to My Products App/i)).toBeInTheDocument();
  });

  test("renders Explore Products button", () => {
    render(<Home />);
    const exploreButton = screen.getByText(/Explore Products/i);
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton).toHaveClass("bg-gradient-to-r");
  });
  test("button has hover effect", () => {
    render(<Home />);
    const exploreButton = screen.getByText(/Explore Products/i);
    fireEvent.mouseEnter(exploreButton);

    expect(exploreButton).toHaveClass("hover:scale-105");
    expect(exploreButton).toHaveClass("hover:shadow-lg");
  });


});
