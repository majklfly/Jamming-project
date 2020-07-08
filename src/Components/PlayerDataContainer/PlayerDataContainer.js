import React, { useEffect, useContext, useState } from "react";

import { Player } from "../Player/Player";

import { Context as playerContext } from "../../store/playerContext";
import { Context as userDataContext } from "../../store/fetchDataContext";

const token = localStorage.getItem("token");

export const PlayerDataContainer = (props) => {
  const [newSong, setNewSong] = useState(false);
  const { nextSong, previousSong } = useContext(playerContext);
  const { state: dataState, getCurrentPlayback } = useContext(userDataContext);

  const forwardSong = () => {
    setNewSong(!newSong);
    nextSong(token);
    getCurrentPlayback(token);
  };

  const backwardSong = () => {
    setNewSong(!newSong);
    previousSong(token);
    getCurrentPlayback(token);
  };

  useEffect(() => {
    getCurrentPlayback(token);
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
