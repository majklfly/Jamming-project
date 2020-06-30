import React, { useContext, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import "./styles.css";

import { Progress } from "antd";

import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import { Context as userDataContext } from "../../store/fetchDataContext";
import { Context as playerContext } from "../../store/playerContext";

export const Player = (props) => {
  const { state: dataState } = useContext(userDataContext);
  const { state: playerState, playSong, pauseSong } = useContext(playerContext);
  const [isPlaying, setIsPlaying] = useState(props.data.is_playing);

  console.log(isPlaying);

  const togglePlayButton = (currentState) => {
    console.log(currentState);
    currentState ? pauseSong(dataState.token) : playSong(dataState.token);
    setIsPlaying(!currentState);
  };

  return (
    <>
      {dataState.userdata && (
        <div className="PlayerContainer">
          {playerState.data && (
            <>
              <h3>{playerState.data.item.name}</h3>
              <img
                alt="album"
                src={playerState.data.item.album.images[2].url}
                className="playerContainerIMG"
              />

              <AnimateSharedLayout>
                <motion.div
                  animate
                  style={{ opacity: isPlaying ? 1 : 0 }}
                  className="iconPosition"
                >
                  <PauseOutlined className="playIcon" />
                </motion.div>
                <motion.div
                  animate
                  style={{ opacity: isPlaying ? 0 : 1 }}
                  className="iconPosition"
                >
                  <CaretRightOutlined
                    className="playIcon"
                    onClick={() => togglePlayButton(isPlaying)}
                  />
                </motion.div>
              </AnimateSharedLayout>
              <Progress percent={50} />
            </>
          )}
        </div>
      )}
    </>
  );
};
