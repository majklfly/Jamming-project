import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

const TrackList = (props) => {
  return (
    <div className="TrackList" data-test="TrackList">
      {props.tracks !== undefined &&
        props.tracks.map((track) => {
          return (
            <Track
              key={track.id}
              track={track}
              isRemoval={props.isRemoval}
              data-test="TrackListTrack"
            />
          );
        })}
    </div>
  );
};

export default TrackList;
