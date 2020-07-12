import React, { useState, useContext } from "react";
import "./PlayerProgressBar.css";
import { useCookies } from "react-cookie";
import { Context as playerContext } from "../../store/playerContext";

export const PlayerProgressBar = (props) => {
  const [toggleBar, setToggleBar] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { updateProgress } = useContext(playerContext);
  let percentage = props.progress / (props.duration / 100);

  const calculateOffset = () => {
    const container = document
      .getElementById("ProgressBarContainer")
      .getBoundingClientRect();

    const updateProgressValues = (position) => {
      if (position < 0) {
        position = 0;
        updateProgress(cookies.token, Math.round(position));
      } else if (position > props.duration) {
        position = props.duration;
        updateProgress(cookies.token, Math.round(position));
      }
      updateProgress(cookies.token, Math.round(position));
      setTimeout(function () {
        setToggleBar(false);
      }, 500);
    };

    const input = document.getElementById("ProgressBarContainer");
    input.addEventListener("mouseup", (e) =>
      updateProgressValues(
        ((e.clientX - container.x) / (container.width / 100)) *
          (props.duration / 100)
      )
    );
  };

  const handleSliderChange = (event, newValue) => {
    if (event.type === "change") {
      setToggleBar(true);
      calculateOffset();
    }
  };

  return (
    <div className="ProgressBarContainer" id="ProgressBarContainer">
      {toggleBar ? (
        <input
          type="range"
          min="1"
          max="100"
          className="progressRange1"
          id="progressRange1"
        />
      ) : (
        <input
          type="range"
          min="1"
          max="100"
          step={0.01}
          value={percentage}
          onChange={handleSliderChange}
          className="progressRange2"
          id="progressRange2"
        />
      )}
    </div>
  );
};
