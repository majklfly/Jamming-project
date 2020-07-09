import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Track from "./Track";
import { Provider as FetchProvider } from "../../store/fetchDataContext";
import { Provider as GlobalProvider } from "../../store/globalContext";

configure({ adapter: new Adapter() });

const data = {
  id: 1,
  name: "testName",
  uri: "testURI",
  album: {
    images: ["url1", "url2", "url3"],
    name: "testAlbumName",
  },
  artists: [
    {
      name: "artistName",
    },
  ],
  external_urls: {
    spotify: "testurladdress",
  },
};

const setUp = () => {
  const wrapper = mount(
    <GlobalProvider>
      <FetchProvider>
        <Track track={data} />
      </FetchProvider>
    </GlobalProvider>
  );
  return wrapper;
};

describe("Player", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Track", () => {
    const container = findByTestAttr(wrapper, "Track");
    expect(container.length).toBe(1);
  });

  it("should render the container for Track-album-cover", () => {
    const container = findByTestAttr(wrapper, "Track-album-cover");
    expect(container.length).toBe(1);
  });

  it("should render the container for Track-information-container", () => {
    const container = findByTestAttr(wrapper, "Track-information-container");
    expect(container.length).toBe(1);
  });
});
