import React, { useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Context as fetchDataContext } from "../../store/fetchDataContext";
import { Context as playerContext } from "../../store/playerContext";

import "./styles.css";

import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResults from "../../Components/SearchResults/SearchResults";

import Playlist from "../../Components/Playlist/Playlist";
import { PlayerDataContainer } from "../../Components/PlayerDataContainer/PlayerDataContainer";

const HomeScreen = () => {
  const { state, getToken, cleanErrorMessage } = useContext(fetchDataContext);
  const { getCurrentPlayback } = useContext(playerContext);

  useEffect(() => {
    getToken();
    getPlayerData();
  }, []); //eslint-disable-line

  const getPlayerData = () => {
    state.token && getCurrentPlayback(state.token);
  };

  return (
    <div>
      {state.token && (
        <>
          <div className="TopContainer">
            <h1>
              Ja<span className="highlight">mm</span>ing
            </h1>
            {state.userdata && (
              <div className="userBoardInfo">
                <h3>{state.userdata.display_name}</h3>
                <h5>
                  {state.userdata.product} |{" "}
                  {state.userdata.followers.total !== 1
                    ? state.userdata.followers.total + " followers"
                    : state.userdata.followers.total + " follower"}
                </h5>
                <a href={state.userdata.external_urls.spotify}>
                  <img
                    className="userBoardIMG"
                    src={state.userdata.images[0].url}
                    alt="profile_img"
                  />
                </a>
              </div>
            )}
          </div>

          <div className="App">
            <div className="Header">
              <SearchBar />
              <PlayerDataContainer />
            </div>
            <AnimatePresence>
              {state.error && (
                <motion.div
                  className="errorMessage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p style={{ opacity: 0 }}>
                    {setTimeout(cleanErrorMessage, 3000)}
                  </p>
                  <p>{state.error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="App-playlist">
              <SearchResults />
              <Playlist />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
