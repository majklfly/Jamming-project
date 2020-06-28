import React, { useState, useContext } from "react";
import "./SearchBar.css";

import { Context } from "../../store/globalContext";
import Spotify from "../../util/Spotify";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { setPlaylist } = useContext(Context);

  const search = () => {
    Spotify.search(term).then(response => {
      setPlaylist(response);
    });
  };

  const handleTermChange = event => {
    setTerm(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      search();
    }
  };
  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
        onKeyPress={handleKeyPress}
      />
      <div className="SearchButton" onClick={() => search()}>
        SEARCH
      </div>
    </div>
  );
};

export default SearchBar;
