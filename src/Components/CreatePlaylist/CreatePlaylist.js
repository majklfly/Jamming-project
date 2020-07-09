import React, { useState, useContext } from "react";
import "./CreatePlaylist.css";
import TrackList from "../TrackList/TrackList";
import { useCookies } from "react-cookie";

import { Context as GlobalContext } from "../../store/globalContext";
import { Context as FetchDataContext } from "../../store/fetchDataContext";

export const CreatePlaylist = (props) => {
  const [nameChange, setNameChange] = useState("");
  const [cookies] = useCookies(["token"]);
  const { state: globalState } = useContext(GlobalContext);
  const { state: userState, spotifySavePlaylist } = useContext(
    FetchDataContext
  );

  const handleNameChange = (event) => {
    setNameChange(event.target.value);
  };

  const savePlaylist = async () => {
    const trackURIs = globalState.tracks.map((track) => track.uri);
    spotifySavePlaylist(
      nameChange,
      trackURIs,
      userState.userdata.id,
      cookies.token
    );
  };

  return (
    <div className="Playlist" data-test="Playlist">
      <div className="Playlist-header">
        <h2>Create Playlist</h2>
        <input placeholder="New Name" onChange={handleNameChange} />
      </div>
      <div className="Playlist-content">
        <TrackList tracks={globalState.tracks} isRemoval={true} />
      </div>
      <div className="Playlist-save" onClick={savePlaylist}>
        SAVE TO SPOTIFY
      </div>
    </div>
  );
};
