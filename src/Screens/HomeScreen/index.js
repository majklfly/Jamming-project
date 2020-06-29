import React, { useEffect, useContext } from "react";

import { Context } from "../../store/fetchDataContext";

import "./styles.css";

import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResults from "../../Components/SearchResults/SearchResults";
import Playlist from "../../Components/Playlist/Playlist";

const HomeScreen = () => {
  const { getToken } = useContext(Context)

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div>
      <h1>
        Ja<span className="highlight">mm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

