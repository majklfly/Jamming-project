import React, { useEffect, useContext, useState } from "react";

import { Player } from "../Player/Player";
import "./PlayerDataContainer.css";

import { Context as playerContext } from "../../store/playerContext";
import { Context as userDataContext } from "../../store/fetchDataContext";
import { useCookies } from "react-cookie";

export const PlayerDataContainer = (props) => {
  const [newSong, setNewSong] = useState(false);
  const { nextSong, previousSong } = useContext(playerContext);
  const { state: dataState, getCurrentPlayback } = useContext(userDataContext);
  const [cookies] = useCookies(["token"]);

  const forwardSong = async () => {
    setNewSong(!newSong);
    nextSong(cookies.token);
    getCurrentPlayback(cookies.token);
  };

  const backwardSong = async () => {
    setNewSong(!newSong);
    previousSong(cookies.token);
    getCurrentPlayback(cookies.token);
  };

  const getPlayer = async () => {
    getCurrentPlayback(cookies.token);
  };

  useEffect(() => {
    getPlayer();
  }, []); //eslint-disable-line
  return (
    <div data-test="PlayerDataContainer">
      {dataState.playerdata ? (
        <Player
          data={dataState.playerdata}
          forwardSong={forwardSong}
          backwardSong={backwardSong}
          getCurrentPlayback={getCurrentPlayback}
        />
      ) : (
        <h3 className="errorPlayerMessage">
          Please, play a song on your device and reload the page to enable the
          player
        </h3>
      )}
    </div>
  );
};
