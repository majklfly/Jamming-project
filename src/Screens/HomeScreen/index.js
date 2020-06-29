import React, { useEffect, useContext } from "react";

import { Context } from "../../store/fetchDataContext";

import "./styles.css";

import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResults from "../../Components/SearchResults/SearchResults";

import Playlist from "../../Components/Playlist/Playlist";
import { UserBoard } from "../../Components/UserBoard/UserBoard";

const HomeScreen = () => {
  const { state, getToken } = useContext(Context);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      {state.token && (
        <>
          <h1>
            Ja<span className="highlight">mm</span>ing
          </h1>
          <div className="App">
            <div className="Header">
              <SearchBar />
              <UserBoard />
            </div>
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
