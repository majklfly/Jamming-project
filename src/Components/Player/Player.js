import React, { useContext, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Timer from "react-compound-timer";
import "./styles.css";

import { Progress } from "antd";

import {
  CaretRightOutlined,
  PauseOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { Context as userDataContext } from "../../store/fetchDataContext";
import { Context as playerContext } from "../../store/playerContext";
import { Context as globalContext } from "../../store/globalContext";

export const Player = (props) => {
  const controls = useAnimation();

  const { state: dataState, getCurrentPlayback } = useContext(userDataContext);
  const { state: globalState, resetAnimation } = useContext(globalContext);
  const { playSong, pauseSong } = useContext(playerContext);
  const [isPlaying, setIsPlaying] = useState(props.data.is_playing);

  const full = props.data.item.duration_ms;
  const rest = props.data.item.duration_ms - props.data.progress_ms;
  const current = rest / (full / 100);
  const restInSec = rest / 1000;
  const width = -window.outerWidth / 2.75;

  const updateStateofPlayer = () => {
    getCurrentPlayback(dataState.token);
  };

  setTimeout(function () {
    updateStateofPlayer();
  }, 5000);

  console.log(globalState);

  if (globalState.resetAnimation) {
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    resetAnimation(false);
  }

  const togglePlayButton = (currentState, pause, start) => {
    if (currentState) {
      pause();
      pauseSong(dataState.token);
      controls.stop();
    } else {
      start();
      playSong(dataState.token);
      controls.start({
        x: 0,
        transition: { duration: restInSec },
      });
    }
    setIsPlaying(!currentState);
  };

  const endOfSong = () => {
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    setTimeout(function () {
      props.getCurrentPlayback(dataState.token);
    }, 400);
  };

  const pressNext = () => {
    props.forwardSong();
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    setTimeout(function () {
      props.getCurrentPlayback(dataState.token);
    }, 400);
  };

  const pressPrevious = () => {
    props.backwardSong();
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    setTimeout(function () {
      props.getCurrentPlayback(dataState.token);
    }, 400);
  };

  if (isPlaying) {
    controls.start({
      x: 0,
      transition: { duration: restInSec },
    });
  }

  return (
    <div className="PlayerContainer">
      <Timer
        initialTime={rest}
        direction="backward"
        checkpoints={[{ time: 0, callback: () => endOfSong() }]}
      >
        {({ start, pause, reset }) => (
          <React.Fragment>
            {props.data.item.name.length < 30 ? (
              <h3>{props.data.item.name}</h3>
            ) : (
              <h5>{props.data.item.name}</h5>
            )}
            <img
              alt="album"
              src={props.data.item.album.images[2].url}
              className="playerContainerIMG"
            />
            <RightOutlined className="iconNext" onClick={() => pressNext()} />
            <div className="iconPosition"> </div>
            <motion.div style={{ opacity: isPlaying ? 1 : 0, x: 0 }}>
              <PauseOutlined className="playIcon" />
            </motion.div>
            <motion.div animate style={{ opacity: isPlaying ? 0 : 1, x: 0 }}>
              <CaretRightOutlined
                className="playIcon"
                onClick={() => togglePlayButton(isPlaying, pause, start)}
              />
            </motion.div>
            <LeftOutlined
              className="iconPrevious"
              onClick={() => pressPrevious()}
            />
            <div className="playerProgressContainer">
              <motion.div
                animate={controls}
                initial={{ x: `-${current}%` }}
                className="playerProgress"
              >
                <Progress
                  percent={100}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  showInfo={false}
                />
              </motion.div>
            </div>
            <div className="playerTimer"></div>
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
};
