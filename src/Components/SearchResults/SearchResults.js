import React, { useContext } from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

import { Context } from "../../store/globalContext";

const SearchResults = props => {
  const { state } = useContext(Context);

  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      <TrackList tracks={state.playlist} />
    </div>
  );
};

export default SearchResults;
