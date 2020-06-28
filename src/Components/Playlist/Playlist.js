import React, { useState, useContext } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import Spotify from "../../util/Spotify";

import { Context } from "../../store/globalContext";

const Playlist = props => {
  const [nameChange, setNameChange] = useState("");
  const { state } = useContext(Context);

  const handleNameChange = event => {
    setNameChange(event.target.value);
  };

  const savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(nameChange, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      });
    });
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
