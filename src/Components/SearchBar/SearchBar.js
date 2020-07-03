import React, { useState, useContext } from "react";
import "./SearchBar.css";

import { Context as DataContext } from "../../store/fetchDataContext";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { state, spotifySearch } = useContext(DataContext);

  const search = () => {
    spotifySearch(term, state.token);
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
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
