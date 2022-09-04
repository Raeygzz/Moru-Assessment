import { render, screen } from "@testing-library/react";
import ShallowRenderer from "react-test-renderer/shallow";

import App from "./App";

import { Provider } from "react-redux";
import Store from "./toolkit/Store";

import "regenerator-runtime";

/** Add any global mocks needed for the test suite here */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test("renders Dashboard heading", () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText("Dashboard");
  expect(linkElement).toBeInTheDocument();
});

it("renders App correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
