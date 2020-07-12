import React, { useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import Timer from "react-compound-timer";
import "./styles.css";
import { Progress } from "antd";
import { useCookies } from "react-cookie";

import {
  CaretRightOutlined,
  PauseOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { Context as playerContext } from "../../store/playerContext";
import { Context as globalContext } from "../../store/globalContext";
import { Context as userDataContext } from "../../store/fetchDataContext";
import { VolumeController } from "../VolumeController/VolumeController";

export const Player = (props) => {
  const controls = useAnimation();
  const { state: globalState, resetAnimation } = useContext(globalContext);
  const { playSong, pauseSong } = useContext(playerContext);
  const { getCurrentPlayback } = useContext(userDataContext);
  const [cookies] = useCookies(["token"]);

  const full = props.data.item.duration_ms;
  const rest = props.data.item.duration_ms - props.data.progress_ms;
  const current = rest / (full / 100);
  const restInSec = rest / 1000;
  const width = -window.outerWidth / 2.75;

  if (globalState.resetAnimation) {
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    resetAnimation(false);
  }

  const updatePLayback = () => {
    getCurrentPlayback(cookies.token);
  };

  setTimeout(function () {
    updatePLayback();
  }, 400);

  const togglePlayButton = (currentState, pause, start) => {
    if (currentState) {
      pause();
      pauseSong(cookies.token);
      controls.stop();
    } else {
      start();
      playSong(cookies.token);
      controls.start({
        x: 0,
        transition: { duration: restInSec },
      });
    }
  };

  const endOfSong = async () => {
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    setTimeout(function () {
      props.getCurrentPlayback(cookies.token);
    }, 400);
  };

  const pressNext = async () => {
    props.forwardSong();
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    setTimeout(function () {
      props.getCurrentPlayback(cookies.token);
    }, 400);
  };

  const pressPrevious = async () => {
    props.backwardSong();
    controls.set({
      x: width,
      transition: { duration: restInSec },
    });
    setTimeout(function () {
      props.getCurrentPlayback(cookies.token);
    }, 400);
  };

  props.data.is_playing
    ? controls.start({
        x: 0,
        transition: { duration: restInSec },
      })
    : controls.stop();

  return (
    <div className="PlayerContainer" data-test="PlayerContainer">
      <VolumeController volume={props.data.device.volume_percent} />
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
              src={props.data.item.album.images[0].url}
              className="playerContainerIMG"
            />
            <div className="PlayerControllers">
              <RightOutlined className="iconNext" onClick={() => pressNext()} />
              <div className="iconPosition"> </div>
              <motion.div
                style={{ opacity: props.data.is_playing ? 1 : 0, x: 0 }}
              >
                <PauseOutlined className="playIcon" />
              </motion.div>
              <motion.div
                animate
                style={{ opacity: props.data.is_playing ? 0 : 1, x: 0 }}
              >
                <CaretRightOutlined
                  className="playIcon"
                  onClick={() =>
                    togglePlayButton(props.data.is_playing, pause, start)
                  }
                />
              </motion.div>
              <LeftOutlined
                className="iconPrevious"
                onClick={() => pressPrevious()}
              />
            </div>
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
