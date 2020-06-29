import React, { useContext } from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

import { Context } from "../../store/fetchDataContext";

const SearchResults = props => {
  const { state } = useContext(Context);

  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      {state.tracks && <TrackList tracks={state.tracks} />}
    </div>
  );
};

export default SearchResults;
