import React, { useEffect, useContext, useState } from "react";

import { Player } from "../Player/Player";

import { Context as playerContext } from "../../store/playerContext";
import { Context as userDataContext } from "../../store/fetchDataContext";

export const PlayerDataContainer = (props) => {
  const [newSong, setNewSong] = useState(false);
  const { nextSong, previousSong } = useContext(playerContext);
  const { state: dataState, getCurrentPlayback } = useContext(userDataContext);

  const forwardSong = async () => {
    const token = await localStorage.getItem("token");
    setNewSong(!newSong);
    nextSong(token);
    getCurrentPlayback(token);
  };

  const backwardSong = async () => {
    const token = await localStorage.getItem("token");
    setNewSong(!newSong);
    previousSong(token);
    getCurrentPlayback(token);
  };

  const getPlayer = async () => {
    const token = await localStorage.getItem("token");
    getCurrentPlayback(token);
  };

  useEffect(() => {
    getPlayer();
  }, []); //eslint-disable-line
  return (
    <div data-test="PlayerDataContainer">
      {dataState.playerdata && (
        <Player
          data={dataState.playerdata}
          forwardSong={forwardSong}
          backwardSong={backwardSong}
          getCurrentPlayback={getCurrentPlayback}
        />
      )}
    </div>
  );
};
