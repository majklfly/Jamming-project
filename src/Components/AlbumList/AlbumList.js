import React from "react";
import Track from "../Track/Track";

export const AlbumList = (props) => {
  return (
    <div className="TrackList" data-test="AlbumList">
      {props.albums !== undefined &&
        props.albums.map((album) => {
          return <Track key={album.id} track={album} />;
        })}
    </div>
  );
};
