import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import SearchInput from "../widget";

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
    let value = "";
    let onChange = jest.fn().mockImplementation(e => (value = e.target.value));
    const wrapper = mount(
      <ThemeProvider theme={createMuiTheme()}>
        <SearchInput {...props()} onChange={onChange} value="" />
      </ThemeProvider>
    );
    wrapper.find("input").simulate("change", { target: { value: "foo" } });
    expect(onChange).toHaveBeenCalled();
    expect(value).toEqual("foo");
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
});
