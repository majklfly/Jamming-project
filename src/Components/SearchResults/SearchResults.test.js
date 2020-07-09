import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SearchResults from "./SearchResults";
import { Provider as FetchProvider } from "../../store/fetchDataContext";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <SearchResults />
    </FetchProvider>
  );
  return wrapper;
};

describe("SearchResults", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "SearchResults");
    expect(container.length).toBe(1);
  });

  it("should render the Tracklist by default", () => {
    const tracklist = findByTestAttr(wrapper, "Tracklist");
    expect(tracklist.length).toBe(1);
  });

  it("should render the Album list after click", () => {
    const button = findByTestAttr(wrapper, "AlbumsButton");
    button.simulate("click");
    const albumlist = findByTestAttr(wrapper, "AlbumListContainer");
    expect(albumlist.length).toBe(1);
  });

  it("should render the Artist list after click", () => {
    const button = findByTestAttr(wrapper, "ArtistsButton");
    button.simulate("click");
    const artistlist = findByTestAttr(wrapper, "ArtistsListContainer");
    expect(artistlist.length).toBe(1);
  });
});
