import React, { useContext } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

import { Context } from "../App/App";

const Playlist = props => {
  const globalContext = useContext(Context);

  console.log(globalContext.globalState.tracks);

  const handleNameChange = event => {
    props.onNameChange(event.target.value);
  };
  return (
    <div className="Playlist">
      <input defaultValue={props.playlistName} onChange={handleNameChange} />
      <TrackList
        tracks={globalContext.globalState.tracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <a className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </a>
    </div>
  );
};

export default Playlist;
