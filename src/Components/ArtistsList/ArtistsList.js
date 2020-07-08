import React from "react";
import Track from "../Track/Track";

export const ArtistsList = (props) => {
  return (
    <div className="TrackList" data-test="ArtistsList">
      {props.artists !== undefined &&
        props.artists.map((artist) => {
          return <Track key={artist.id} track={artist} />;
        })}
    </div>
  );
};
