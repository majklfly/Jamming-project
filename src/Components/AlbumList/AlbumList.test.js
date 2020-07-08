import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { AlbumList } from "./AlbumList";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(<AlbumList />);
  return wrapper;
};

describe("AlbumList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "AlbumList");
    expect(container.length).toBe(1);
  });
});
