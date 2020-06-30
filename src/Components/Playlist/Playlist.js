import React, { useState, useContext } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

import { Context as GlobalContext } from "../../store/globalContext";
import { Context as FetchDataContext } from "../../store/fetchDataContext";

const Playlist = (props) => {
  const [nameChange, setNameChange] = useState("");
  const { state: globalState } = useContext(GlobalContext);
  const { state: userState, spotifySavePlaylist } = useContext(
    FetchDataContext
  );

  const handleNameChange = (event) => {
    setNameChange(event.target.value);
  };

  const savePlaylist = () => {
    const trackURIs = globalState.tracks.map((track) => track.uri);
    spotifySavePlaylist(
      nameChange,
      trackURIs,
      userState.userdata.id,
      userState.token
    );
  };

  return (
    <div className="Playlist">
      <div className="Playlist-header">
        <h2>Create Playlist</h2>
        <input placeholder="New Name" onChange={handleNameChange} />
      </div>

      <TrackList tracks={globalState.tracks} isRemoval={true} />
      <div className="Playlist-save" onClick={savePlaylist}>
        SAVE TO SPOTIFY
      </div>
    </div>
  );
};

export default Playlist;
