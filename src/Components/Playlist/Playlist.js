import React, { useState, useContext } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import { spotifySavePlaylist } from '../../api/Spotify'

import { Context } from "../../store/globalContext";

const Playlist = props => {
  const [nameChange, setNameChange] = useState("");
  const { state } = useContext(Context);

  const handleNameChange = event => {
    setNameChange(event.target.value);
  };

  const savePlaylist = () => {
    const trackURIs = state.tracks.map(track => track.uri);
    spotifySavePlaylist(nameChange, trackURIs)
  };

  return (
    <div className="Playlist">
      <div className="Playlist-header">
        <h2>Create Playlist</h2>
        <input placeholder="New Name" onChange={handleNameChange} />
      </div>

      <TrackList tracks={state.tracks} isRemoval={true} />
      <div className="Playlist-save" onClick={savePlaylist}>
        SAVE TO SPOTIFY
      </div>
    </div>
  );
};

export default Playlist;
