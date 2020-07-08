import React, { useState, useContext } from "react";
import "./SearchBar.css";

import { Context as DataContext } from "../../store/fetchDataContext";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { spotifySearch } = useContext(DataContext);

  const search = async () => {
    const token = await localStorage.getItem("token");
    spotifySearch(term, token);
    setTerm("");
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
    <div className="SearchBar" data-test="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={term}
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
