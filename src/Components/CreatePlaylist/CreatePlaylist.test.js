import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CreatePlaylist } from "./CreatePlaylist";
import { Provider as GlobalProvider } from "../../store/globalContext";
import { Provider as FetchProvider } from "../../store/fetchDataContext";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <GlobalProvider>
        <CreatePlaylist />
      </GlobalProvider>
    </FetchProvider>
  );
  return wrapper;
};

describe("CreatePlaylist", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for CreatePlaylist", () => {
    const container = findByTestAttr(wrapper, "Playlist");
    expect(container.length).toBe(1);
  });
});
