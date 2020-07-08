import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SearchBar from "./SearchBar";
import { Provider as FetchProvider } from "../../store/fetchDataContext";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <SearchBar />
    </FetchProvider>
  );
  return wrapper;
};

describe("SearchBar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "SearchBar");
    expect(container.length).toBe(1);
  });
});
