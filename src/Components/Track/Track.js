import React, { useContext } from "react";
import "./Track.css";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Context } from "../../store/globalContext";
import { Context as DataContext } from "../../store/fetchDataContext";

const Track = (props) => {
  const { addTrack, removeTrack, resetAnimation } = useContext(Context);
  const { state, playSpecificSong, getCurrentPlayback } = useContext(
    DataContext
  );

  const playTheSong = (uri) => {
    playSpecificSong(state.token, uri);
    resetAnimation(true);
    setTimeout(function () {
      getCurrentPlayback(state.token);
    }, 400);
  };

  return (
    <div className="Track" key={props.track.id}>
      <div className="Track-cover-preview">
        <img
          className="Track-album-cover"
          src={props.track.album.images[2].url}
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
          {props.track.artists[0].name} | {props.track.album.name}
        </p>
      </div>
      {props.isRemoval ? (
        <DeleteOutlined
          onClick={() => removeTrack(props.track)}
          className="Track-icon"
        />
      ) : (
        <div className="Track-icons-container">
          <PlayCircleOutlined
            className="Track-icon"
            onClick={() => playTheSong(props.track.uri)}
          />
          <PlusCircleOutlined
            onClick={() => addTrack(props.track)}
            className="Track-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Track;
