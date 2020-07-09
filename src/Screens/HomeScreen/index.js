import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookies, CookiesProvider } from "react-cookie";

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
  const { state, cleanErrorMessage, getUserData } = useContext(
    fetchDataContext
  );
  const [showUserPlaylist, setShowUserPlaylist] = useState(true);
  const [showUserAlbums, setShowUserAlbums] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const checkExpiration = async () => {
    const date = new Date();
    const currentTime = date.getTime();
    const expTime = localStorage.getItem("expTime");
    currentTime > expTime && removeCookie();
  };

  useEffect(() => {
    state.token && setCookie("token", state.token, { path: "/" });
  }, [state.token]); //eslint-disable-line

  console.log(cookies.token);

  useEffect(() => {
    getPlayerData();
  }, []); //eslint-disable-line

  const getPlayerData = () => {
    getUserData(cookies.token);
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

  if (cookies.token) {
    return (
      <>
        {state.userdata && (
          <>
            <div className="TopContainer">
              <h1>
                Ja<span className="highlight">mm</span>ing
              </h1>

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
            </div>

            <div className="App">
              <div className="Header">
                <SearchBar />
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
        )}
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
