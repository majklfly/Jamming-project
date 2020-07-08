import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { ArtistsList } from "./ArtistsList";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(<ArtistsList />);
  return wrapper;
};

describe("ArtistsList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "ArtistsList");
    expect(container.length).toBe(1);
  });
});
