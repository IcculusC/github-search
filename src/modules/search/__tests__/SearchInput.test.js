import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import SearchInput from "../SearchInput";

const props = () => {
  const props$ = {
    loading: false,
    onChange: jest.fn(),
    onSearch: jest.fn(),
    square: false,
    value: ""
  };
  return props$;
};

describe("SearchInput", () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it("renders", () => {
    mount(
      <ThemeProvider theme={createMuiTheme()}>
        <SearchInput {...props()} />
      </ThemeProvider>
    );
  });

  it("calls it's onChange listener correctly", () => {
    const { onChange, ...rest } = props();
    const wrapper = mount(
      <ThemeProvider theme={createMuiTheme()}>
        <SearchInput onChange={onChange} {...rest} />
      </ThemeProvider>
    );
    wrapper.find("input").simulate("change", { target: { value: "foo" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("calls it's onSearch listener correctly", () => {
    const { onSearch, ...rest } = props();
    const wrapper = mount(
      <ThemeProvider theme={createMuiTheme()}>
        <SearchInput onSearch={onSearch} {...rest} value="foo" />
      </ThemeProvider>
    );
    wrapper.find("button").simulate("click");
    wrapper.find("input").simulate("keydown", { key: "Enter" });
    expect(onSearch).toHaveBeenCalledTimes(2);
  });

  it("renders it's loading state", () => {
    const wrapper = mount(
      <ThemeProvider theme={createMuiTheme()}>
        <SearchInput {...props()} loading />
      </ThemeProvider>
    );
    expect(wrapper.find("svg").length).toEqual(2);
    expect(wrapper.find("circle").length).toEqual(1);
  });
});
