import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider as FetchProvider } from "../../store/fetchDataContext";
import { Provider as GlobalProvider } from "../../store/globalContext";
import { UserAlbums } from "./UserAlbums";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <GlobalProvider>
      <FetchProvider>
        <UserAlbums />{" "}
      </FetchProvider>
    </GlobalProvider>
  );
  return wrapper;
};

describe("UserAlbum", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for UserAlbums Container", () => {
    const container = findByTestAttr(wrapper, "UserAlbumsContainer");
    expect(container.length).toBe(1);
  });

  it("should render the container for Album in UserAlbums", () => {
    const container = findByTestAttr(wrapper, "Albums");
    expect(container.length).toBe(1);
  });
});
