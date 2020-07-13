import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { PlayerProgressBar } from "./PlayerProgressBar";
import { Provider as PlayerProvider } from "../../store/playerContext";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <PlayerProvider>
      <PlayerProgressBar />
    </PlayerProvider>
  );
  return wrapper;
};

describe("PlayerProgressBar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "PlayerProgressBar");
    expect(container.length).toBe(1);
  });
});
