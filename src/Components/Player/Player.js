import React, { useContext } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import { useCookies } from "react-cookie";

import {
  CaretRightOutlined,
  PauseOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { Context as playerContext } from "../../store/playerContext";
import { Context as userDataContext } from "../../store/fetchDataContext";
import { VolumeController } from "../VolumeController/VolumeController";
import { PlayerProgressBar } from "../PlayerProgressBar/PlayerProgressBar";

export const Player = (props) => {
  const { playSong, pauseSong } = useContext(playerContext);
  const { getCurrentPlayback } = useContext(userDataContext);
  const [cookies] = useCookies(["token"]);

  setTimeout(function () {
    getCurrentPlayback(cookies.token);
  }, 800);

  const togglePlayButton = (currentState) => {
    currentState ? pauseSong(cookies.token) : playSong(cookies.token);
  };

  return (
    <div className="PlayerContainer" data-test="PlayerContainer">
      <VolumeController volume={props.data.device.volume_percent} />
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
          <RightOutlined
            className="iconNext"
            onClick={() => props.forwardSong()}
          />
          <div className="iconPosition"> </div>
          <motion.div style={{ opacity: props.data.is_playing ? 1 : 0, x: 0 }}>
            <PauseOutlined className="playIcon" />
          </motion.div>
          <motion.div
            animate
            style={{ opacity: props.data.is_playing ? 0 : 1, x: 0 }}
          >
            <CaretRightOutlined
              className="playIcon"
              onClick={() => togglePlayButton(props.data.is_playing)}
            />
          </motion.div>
          <LeftOutlined
            className="iconPrevious"
            onClick={() => props.backwardSong()}
          />
        </div>
        <PlayerProgressBar
          progress={props.data.progress_ms}
          duration={props.data.item.duration_ms}
          is_playing={props.data.is_playing}
        />
        <div className="playerTimer"></div>
      </React.Fragment>
    </div>
  );
};
