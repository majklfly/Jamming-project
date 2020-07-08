import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Playlist } from "./Playlist";
import { Provider as GlobalProvider } from "../../store/globalContext";
import { Provider as FetchProvider } from "../../store/fetchDataContext";

configure({ adapter: new Adapter() });

const data = {
  id: 1,
  name: "testname",
  uri: "testURI",
  images: ["url", "url1", "url2"],
};

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <GlobalProvider>
        <Playlist data={data} />
      </GlobalProvider>
    </FetchProvider>
  );
  return wrapper;
};

describe("Player", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Playlist", () => {
    const container = findByTestAttr(wrapper, "PlaylistContainer");
    expect(container.length).toBe(1);
  });

  it("should open the playlist with songs inside", () => {
    const list = findByTestAttr(wrapper, "Track");
    list.simulate("click");
    const openList = findByTestAttr(wrapper, "Track-Open-Header");
    expect(openList.length).toBe(1);
  });
});
