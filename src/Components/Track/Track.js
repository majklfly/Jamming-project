import React, { useState } from "react";
import "./Track.css";
import { PlusCircleOutlined } from "@ant-design/icons";

const Track = props => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);

  const addTrack = () => {
    props.onAdd(props.track);
  };
  const removeTrack = () => {
    props.onRemove(props.track);
  };
  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <i
          className="Track-action fa fa-minus-circle"
          onClick={removeTrack}
        ></i>
      );
    }
    return <PlusCircleOutlined onClick={addTrack} className="Track-addTrack" />;
  };
  return (
    <div className="Track" key={props.track.id}>
      <div className="Track-cover-preview">
        <img
          className="Track-album-cover"
          src={props.track.cover}
          alt="album cover"
        />
      </div>
      <div className="Track-information-container">
        {props.track.name.length < 30 ? (
          <h3 className="Track-information">{props.track.name}</h3>
        ) : (
          <p className="Track-information">{props.track.name}</p>
        )}

        <p className="Track-artist">
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
