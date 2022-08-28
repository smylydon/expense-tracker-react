import React from "react";
import { render, screen, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Transaction from "../Transaction";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  const x = {
    _id: 5,
    color: "",
  };

  render(<Transaction category={x} />);

  const linkElement = screen.getByText(/Trash/i);
  expect(linkElement).toBeInTheDocument();

  //   act(() => {
  //     render(<Transaction name="Jenny" />, container);
  //   });
  //   expect(container.textContent).toBe("Hello, Jenny!");

  //   act(() => {
  //     render(<Hello name="Margaret" />, container);
  //   });
  //   expect(container.textContent).toBe("Hello, Margaret!");
});
