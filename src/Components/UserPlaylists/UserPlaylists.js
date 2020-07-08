import React, { useContext, useEffect } from "react";
import { Context as fetchDataContext } from "../../store/fetchDataContext";

import { Playlist } from "../Playlist/Playlist";

export const UserPlaylists = () => {
  const { state, getCurrentPlaylists } = useContext(fetchDataContext);

  const recievePlaylists = async () => {
    const token = await localStorage.getItem("token");
    getCurrentPlaylists(token);
  };

  useEffect(() => {
    recievePlaylists();
  }, []); //eslint-disable-line

  return (
    <div className="SearchResults">
      <h2>Playlists</h2>
      {state.playlistdata &&
        state.playlistdata.items.map((list) => (
          <div className="Albums-container" key={list.id}>
            <Playlist data={list} key={list.uri} />
          </div>
        ))}
    </div>
  );
};
