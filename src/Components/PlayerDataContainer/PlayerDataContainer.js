import React, { useEffect, useContext, useState } from "react";

import { Player } from "../Player/Player";

import { Context as playerContext } from "../../store/playerContext";
import { Context as userDataContext } from "../../store/fetchDataContext";

export const PlayerDataContainer = (props) => {
  const [newSong, setNewSong] = useState(false);
  const { nextSong, previousSong } = useContext(playerContext);
  const { state: dataState, getCurrentPlayback } = useContext(userDataContext);

  const forwardSong = () => {
    setNewSong(!newSong);
    nextSong(dataState.token);
    getCurrentPlayback(dataState.token);
  };

  const backwardSong = () => {
    setNewSong(!newSong);
    previousSong(dataState.token);
    getCurrentPlayback(dataState.token);
  };

  useEffect(() => {
    getCurrentPlayback(dataState.token);
  }, []); //eslint-disable-line
  return (
    <div>
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
