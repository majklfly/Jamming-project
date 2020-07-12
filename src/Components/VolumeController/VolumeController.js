import React, { useState, useContext } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import "./VolumeController.css";

import { useCookies } from "react-cookie";
import { Context as playerContext } from "../../store/playerContext";

export const VolumeController = (props) => {
  const [value, setValue] = useState(props.volume);
  const [cookies] = useCookies(["token"]);
  const { updateVolume } = useContext(playerContext);

  const handleChange = (event, NewValue) => {
    value !== NewValue && updateVolume(cookies.token, NewValue);
    setValue(NewValue);
  };

  const VolumeSlider = withStyles({
    root: {
      color: "#3a8589",
    },
    thumb: {
      display: "none",
    },
  })(Slider);

  return (
    <div className="VolumeBar">
      <VolumeSlider
        value={value}
        min={0}
        max={100}
        step={1}
        orientation="vertical"
        onChange={handleChange}
        className="volumeSlider"
        aria-labelledby="vertical-slider"
      />
    </div>
  );
};
