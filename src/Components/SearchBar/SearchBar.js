import React, { useState, useContext } from "react";
import "./SearchBar.css";

import { Context as DataContext } from "../../store/fetchDataContext";
import { useCookies } from "react-cookie";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { spotifySearch } = useContext(DataContext);
  const [cookies] = useCookies(["token"]);

  const search = () => {
    spotifySearch(term, cookies.token);
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
