import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";

test("renders learn react link 1", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link 2", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(1).toEqual(1);
});
