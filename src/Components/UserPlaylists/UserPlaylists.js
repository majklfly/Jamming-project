import React, { useContext, useEffect } from "react";
import { Context as fetchDataContext } from "../../store/fetchDataContext";

import { Album } from "../Album/Album";

export const UserPlayLists = () => {
  const { state, getAlbums } = useContext(fetchDataContext);

  useEffect(() => {
    getAlbums(state.token);
  }, []); //eslint-disable-line

  return (
    <div className="SearchResults">
      <h2>Albums</h2>
      {state.albums &&
        state.albums.items.map((album) => (
          <Album data={album} key={album.album.id} />
        ))}
    </div>
  );
};
