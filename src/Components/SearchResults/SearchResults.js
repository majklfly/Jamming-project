import React, { useContext, useState } from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";
import { AlbumList } from "../AlbumList/AlbumList";
import { ArtistsList } from "../ArtistsList/ArtistsList";

import { Context } from "../../store/fetchDataContext";

const SearchResults = (props) => {
  const [showArtists, setShowArtists] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTracks, setShowTracks] = useState(true);
  const { state } = useContext(Context);

  const renderArtists = () => {
    setShowArtists(true);
    setShowAlbums(false);
    setShowTracks(false);
  };

  const renderTracks = () => {
    setShowArtists(false);
    setShowAlbums(false);
    setShowTracks(true);
  };

  const renderAlbums = () => {
    setShowArtists(false);
    setShowAlbums(true);
    setShowTracks(false);
  };

  return (
    <div className="SearchResults" data-test="SearchResults">
      <h2>Search Results</h2>
      <div className="SearchResultsCards">
        <h3
          onClick={() => renderTracks()}
          className={showTracks ? "activeButton" : "className"}
        >
          Tracks
        </h3>
        <h3
          data-test="ArtistsButton"
          className={showArtists ? "activeButton" : "className"}
          onClick={() => renderArtists()}
        >
          Artists
        </h3>
        <h3
          data-test="AlbumsButton"
          className={showAlbums ? "activeButton" : "className"}
          onClick={() => renderAlbums()}
        >
          Albums
        </h3>
      </div>

      <div className="SearchResults-content">
        {state.searchdata && showTracks ? (
          <TrackList
            tracks={state.searchdata.tracks.items}
            data-test="Tracklist"
          />
        ) : null}
        {state.searchdata && showAlbums ? (
          <AlbumList
            albums={state.searchdata.albums.items}
            data-test="AlbumListContainer"
          />
        ) : null}
        {state.searchdata && showArtists ? (
          <ArtistsList
            artists={state.searchdata.artists.items}
            data-test="ArtistsListContainer"
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchResults;
