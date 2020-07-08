import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Player } from "./Player";
import { Provider as GlobalProvider } from "../../store/globalContext";
import { Provider as FetchProvider } from "../../store/fetchDataContext";
import { Provider as PlayerProvider } from "../../store/playerContext";

configure({ adapter: new Adapter() });

const data = {
  is_playing: true,
  progress_ms: 5000,
  item: {
    duration_ms: 7000,
    name: "testName",
    album: {
      images: ["url", "url2", "url3"],
    },
  },
};

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <GlobalProvider>
        <PlayerProvider>
          <Player data={data} />
        </PlayerProvider>
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

  it("should render the container for Player", () => {
    const container = findByTestAttr(wrapper, "PlayerContainer");
    expect(container.length).toBe(1);
  });
});
