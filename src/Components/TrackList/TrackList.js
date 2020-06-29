import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

const TrackList = props => {

  return (
    <div className="TrackList">
      {props.tracks.length > 0 &&
        props.tracks.map(track => {
          console.log('track', track)
          return (
            <Track key={track.id} track={track} isRemoval={props.isRemoval} />
          );
        })}
    </div>
  );
};

export default TrackList;
