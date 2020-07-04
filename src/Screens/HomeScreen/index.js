import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faHome } from "@fortawesome/free-solid-svg-icons";

import { Context as fetchDataContext } from "../../store/fetchDataContext";
import { Context as playerContext } from "../../store/playerContext";

import "./styles.css";

import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResults from "../../Components/SearchResults/SearchResults";

import Playlist from "../../Components/Playlist/Playlist";
import { PlayerDataContainer } from "../../Components/PlayerDataContainer/PlayerDataContainer";
import { UserPlayLists } from "../../Components/UserPlaylists/UserPlaylists";
import { WelcomeScreen } from "../WelcomeScreen/WelcomeScreen";

const HomeScreen = () => {
  const { state, cleanErrorMessage } = useContext(fetchDataContext);
  const { getCurrentPlayback } = useContext(playerContext);
  const [showUserPlaylist, setShowUserPlaylist] = useState(false);

  useEffect(() => {
    getPlayerData();
  }, []); //eslint-disable-line

  const getPlayerData = () => {
    console.log(state.token);
    state.token && getCurrentPlayback(state.token);
  };

  if (state.token) {
    return (
      <>
        <div className="TopContainer">
          <h1>
            Ja<span className="highlight">mm</span>ing
          </h1>
          {state.userdata && (
            <div className="userBoardInfo">
              <div onClick={() => setShowUserPlaylist(!showUserPlaylist)}>
                {showUserPlaylist ? (
                  <FontAwesomeIcon
                    icon={faHome}
                    className="ShowPlayerListIcon"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCompactDisc}
                    className="ShowPlayerListIcon"
                  />
                )}
              </div>
              <h3>{state.userdata.display_name}</h3>
              <h5>
                {state.userdata.product} |{" "}
                {state.userdata.followers.total !== 1
                  ? state.userdata.followers.total + " followers"
                  : state.userdata.followers.total + " follower"}
              </h5>
              <a href={state.userdata.external_urls.spotify}>Hello</a>
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
            {showUserPlaylist ? <UserPlayLists /> : <Playlist />}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <WelcomeScreen />
      </div>
    );
  }
};

export default HomeScreen;
