import React from "react";
import { findByTestAttr } from "../../util";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { VolumeController } from "./VolumeController";
import { Provider as PlayerProvider } from "../../store/playerContext";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = mount(
    <PlayerProvider>
      <VolumeController />
    </PlayerProvider>
  );
  return wrapper;
};

describe("VolumeController", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the container for Album", () => {
    const container = findByTestAttr(wrapper, "VolumeController");
    expect(container.length).toBe(1);
  });
});
