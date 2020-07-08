import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Album } from "./Album";
import { Provider as GlobalProvider } from "../../store/globalContext";
import { Provider as FetchProvider } from "../../store/fetchDataContext";

configure({ adapter: new Adapter() });

const data = {
  album: {
    id: 1,
    images: ["url0", "url1", "url2"],
    name: "testName",
    tracks: {
      items: [
        { id: 1, uri: "testuri", name: "testName" },
        { id: 2, uri: "testuri2", name: "testName2" },
        { id: 3, uri: "testuri3", name: "testName3" },
      ],
    },
  },
};

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <GlobalProvider>
        <Album data={data} />
      </GlobalProvider>
    </FetchProvider>
  );
  return wrapper;
};

describe("Album", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "AlbumContainer");
    expect(container.length).toBe(1);
  });

  it("should show the details of the album", () => {
    const album = findByTestAttr(wrapper, "Track");
    album.simulate("click");
    const track = findByTestAttr(wrapper, "Track-Open-Header");
    const detail = findByTestAttr(wrapper, "Track-Open-Detail");
    expect(track.length).toBe(1);
    expect(detail.length).toBe(3);
  });
});
