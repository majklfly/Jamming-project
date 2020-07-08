import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PlayerDataContainer } from "./PlayerDataContainer";
import { Provider as FetchProvider } from "../../store/fetchDataContext";
import { Provider as PlayerProvider } from "../../store/playerContext";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <FetchProvider>
      <PlayerProvider>
        <PlayerDataContainer />
      </PlayerProvider>
    </FetchProvider>
  );
  return wrapper;
};

describe("Player", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for PlayerData", () => {
    const container = findByTestAttr(wrapper, "PlayerDataContainer");
    expect(container.length).toBe(1);
  });
});
