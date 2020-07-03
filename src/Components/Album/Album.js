import React, { useState, useContext } from "react";
import "./Album.css";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Context as DataContext } from "../../store/fetchDataContext";
import { Context as globalContext } from "../../store/globalContext";

export const Album = (props) => {
  const [showAlbumDetails, setShowAlbumDetails] = useState(false);
  const { resetAnimation } = useContext(globalContext);
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
    <div>
      {showAlbumDetails ? (
        <div key={props.data.album.id} className="Track-Open">
          <div
            onClick={() => setShowAlbumDetails(!showAlbumDetails)}
            className="Track-Open-Header"
          >
            <img
              src={props.data.album.images[2].url}
              alt="album cover"
              className="Track-img-open"
            />
            <h4>{props.data.album.name}</h4>
          </div>
          <div>
            {props.data.album.tracks.items.map((track) => (
              <div className="Track-Open-Detail" key={track.id}>
                <div className="Track-Open-Detail-Icon">
                  <PlayCircleOutlined
                    className="Track-icon"
                    onClick={() => playTheSong(track.uri)}
                  />
                </div>
                {track.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={() => setShowAlbumDetails(!showAlbumDetails)}
          key={props.data.album.id}
        >
          <div className="Track" style={{ cursor: "pointer" }}>
            <div className="Track-cover-preview">
              <img
                className="Track-album-cover"
                src={props.data.album.images[2].url}
                alt="album cover"
              />
            </div>
            <div className="Track-information-container">
              {props.data.album.name.length < 30 ? (
                <h3 className="Track-information">{props.data.album.name}</h3>
              ) : (
                <p className="Track-information">{props.data.album.name}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
