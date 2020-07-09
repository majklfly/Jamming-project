import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompactDisc,
  faList,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Context as fetchDataContext } from "../../store/fetchDataContext";

import empty_profile from "../../assets/empty_profile.png";

import "./styles.css";

import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResults from "../../Components/SearchResults/SearchResults";

import { CreatePlaylist } from "../../Components/CreatePlaylist/CreatePlaylist";
import { PlayerDataContainer } from "../../Components/PlayerDataContainer/PlayerDataContainer";
import { UserAlbums } from "../../Components/UserAlbums/UserAlbums";
import { UserPlaylists } from "../../Components/UserPlaylists/UserPlaylists";
import { WelcomeScreen } from "../WelcomeScreen/WelcomeScreen";

const HomeScreen = () => {
  const {
    state,
    cleanErrorMessage,
    getCurrentPlayback,
    getUserData,
  } = useContext(fetchDataContext);
  const [showUserPlaylist, setShowUserPlaylist] = useState(true);
  const [showUserAlbums, setShowUserAlbums] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const checkExpiration = async () => {
    const date = new Date();
    const currentTime = date.getTime();
    const expTime = localStorage.getItem("expTime");
    currentTime > expTime && localStorage.removeItem("token");
  };

  useEffect(() => {
    getPlayerData();
  }, []); //eslint-disable-line

  const getPlayerData = async () => {
    const token = await localStorage.getItem("token");
    getCurrentPlayback(token);
    getUserData(token);
    checkExpiration();
  };

  const renderPlayLists = () => {
    setShowUserPlaylist(true);
    setShowUserAlbums(false);
    setShowCreatePlaylist(false);
  };

  const renderAlbums = () => {
    setShowUserPlaylist(false);
    setShowUserAlbums(true);
    setShowCreatePlaylist(false);
  };

  const renderCreatePlaylist = () => {
    setShowUserPlaylist(false);
    setShowUserAlbums(false);
    setShowCreatePlaylist(true);
  };

  const token = localStorage.getItem("token");

  if (token) {
    return (
      <>
        <div className="TopContainer">
          <h1>
            Ja<span className="highlight">mm</span>ing
          </h1>
          {state.userdata && (
            <div className="userBoardInfo">
              <FontAwesomeIcon
                icon={faPlus}
                className="createPlaylistIcon"
                onClick={() => renderCreatePlaylist()}
              />
              <FontAwesomeIcon
                icon={faList}
                className="ShowPlayerListIcon"
                onClick={() => renderPlayLists()}
              />
              <FontAwesomeIcon
                icon={faCompactDisc}
                className="ShowAlbumsIcon"
                onClick={() => renderAlbums()}
              />
              {state.userdata.display_name.length > 20 ? (
                <h4>{state.userdata.display_name}</h4>
              ) : (
                <h3>{state.userdata.display_name}</h3>
              )}
              <h5>
                {state.userdata.product} |{" "}
                {state.userdata.followers.total !== 1
                  ? state.userdata.followers.total + " followers"
                  : state.userdata.followers.total + " follower"}
              </h5>
              <a href={state.userdata.external_urls.spotify}>
                {state.userdata.images.length > 0 ? (
                  <img
                    className="userBoardIMG"
                    src={state.userdata.images[0].url}
                    alt="profile_img1"
                  />
                ) : (
                  <img
                    className="userBoardIMG"
                    src={empty_profile}
                    alt="profile_img2"
                  />
                )}
              </a>
            </div>
          )}
        </div>

        {console.log(state.userdata)}

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
            {showUserAlbums && <UserAlbums />}
            {showUserPlaylist && <UserPlaylists />}
            {showCreatePlaylist && <CreatePlaylist />}
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
