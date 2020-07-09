import React, { useContext, useEffect } from "react";
import { Context as fetchDataContext } from "../../store/fetchDataContext";

import { Album } from "../Album/Album";
import "./UserAlbums.css";
import { useCookies } from "react-cookie";

export const UserAlbums = () => {
  const { state, getAlbums } = useContext(fetchDataContext);
  const [cookies] = useCookies(["token"]);

  const recieveAlbums = async () => {
    getAlbums(cookies.token);
  };

  useEffect(() => {
    recieveAlbums();
  }, []); //eslint-disable-line

  return (
    <div className="SearchResults" data-test="UserAlbumsContainer">
      <h2>Albums</h2>
      {state.albums &&
        state.albums.items.map((album) => (
          <div className="Albums-container">
            <Album data={album} key={album.album.id} data-test="Albums" />
          </div>
        ))}
    </div>
  );
};
