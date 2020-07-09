import React, { useContext, useEffect } from "react";
import { Context as fetchDataContext } from "../../store/fetchDataContext";

import { Playlist } from "../Playlist/Playlist";
import { useCookies } from "react-cookie";

export const UserPlaylists = (props) => {
  const { state, getCurrentPlaylists } = useContext(fetchDataContext);
  const [cookies] = useCookies(["token"]);

  const recievePlaylists = () => {
    getCurrentPlaylists(cookies.token);
  };

  useEffect(() => {
    recievePlaylists();
  }, []); //eslint-disable-line

  return (
    <div className="SearchResults" data-test="userPlaylistsContainer">
      <h2>Playlists</h2>
      {state.playlistdata &&
        state.playlistdata.items.map((list) => (
          <div className="Albums-container" key={list.id}>
            <Playlist data={list} key={list.uri} data-test="Playlist" />
          </div>
        ))}
    </div>
  );
};
