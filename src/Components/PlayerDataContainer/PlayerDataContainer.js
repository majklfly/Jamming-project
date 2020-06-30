import React, { useEffect, useContext } from "react";

import { Player } from "../Player/Player";

import { Context as playerContext } from "../../store/playerContext";
import { Context as userDataContext } from "../../store/fetchDataContext";

export const PlayerDataContainer = () => {
  const { state: playerState, getCurrentPlayback } = useContext(playerContext);
  const { state: dataState } = useContext(userDataContext);

  useEffect(() => {
    getCurrentPlayback(dataState.token);
  }, []); //eslint-disable-line
  return <div>{playerState.data && <Player data={playerState.data} />}</div>;
};
