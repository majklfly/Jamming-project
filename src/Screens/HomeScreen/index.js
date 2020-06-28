import React from "react";

import "./styles.css";

import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResults from "../../Components/SearchResults/SearchResults";
import Playlist from "../../Components/Playlist/Playlist";

const HomeScreen = () => {
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
