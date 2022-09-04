import { render, screen } from "@testing-library/react";

import { EditUserDetailModal } from "./shared/pages_common";

import { Provider } from "react-redux";
import Store from "./toolkit/Store";

import ShallowRenderer from "react-test-renderer/shallow";

it("renders EditUserDetailModal correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Provider store={Store}>
      <EditUserDetailModal />
    </Provider>
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
