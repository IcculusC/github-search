import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import App from "./App";

describe("App component", () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it("renders", () => {
    mount(<App />);
  });
});
