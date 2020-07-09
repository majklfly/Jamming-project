import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider as FetchProvider } from "../../store/fetchDataContext";
import { Provider as GlobalProvider } from "../../store/globalContext";
import { UserPlaylists } from "./UserPlaylists";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <GlobalProvider>
      <FetchProvider>
        <UserPlaylists />{" "}
      </FetchProvider>
    </GlobalProvider>
  );
  return wrapper;
};

describe("UserPlaylists", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for UserPlaylists Container", () => {
    const container = findByTestAttr(wrapper, "userPlaylistsContainer");
    expect(container.length).toBe(1);
  });

  it("should render the container for Playlist in UserAlbums", () => {
    const container = findByTestAttr(wrapper, "Playlist");
    expect(container.length).toBe(1);
  });
});
