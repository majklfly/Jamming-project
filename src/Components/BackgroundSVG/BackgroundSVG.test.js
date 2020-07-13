import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BackgroundSVG } from "./BackgroundSVG";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(<BackgroundSVG />);
  return wrapper;
};

describe("BackgroundSVG", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "BackgroundSVG");
    expect(container.length).toBe(1);
  });
});
