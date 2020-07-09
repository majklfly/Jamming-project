import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider as FetchProvider } from "../../store/fetchDataContext";
import { Provider as GlobalProvider } from "../../store/globalContext";
import TrackList from "./TrackList";

configure({ adapter: new Adapter() });

const data = [
  {
    id: 1,
    name: "testName",
    images: ["url1", "url2", "url3"],
    external_urls: {
      spotify: "testExternalURL",
    },
  },
];

const setUp = () => {
  const wrapper = mount(
    <GlobalProvider>
      <FetchProvider>
        <TrackList tracks={data} />{" "}
      </FetchProvider>
    </GlobalProvider>
  );
  return wrapper;
};

describe("TrackList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for TrackList", () => {
    const container = findByTestAttr(wrapper, "TrackList");
    expect(container.length).toBe(1);
  });

  it("should render the container for Track in Tracklist", () => {
    const container = findByTestAttr(wrapper, "TrackListTrack");
    expect(container.length).toBe(1);
  });
});
