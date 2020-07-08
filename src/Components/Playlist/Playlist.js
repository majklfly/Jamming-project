import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Context as DataContext } from "../../store/fetchDataContext";
import { Context as globalContext } from "../../store/globalContext";

export const Playlist = (props) => {
  const [showAlbumDetails, setShowAlbumDetails] = useState(false);
  const [items, setItems] = useState([]);
  const { resetAnimation } = useContext(globalContext);
  const { playSpecificSong, getCurrentPlayback } = useContext(DataContext);

  const playTheSong = async (uri) => {
    const token = await localStorage.getItem("token");
    getPlaylistItems(props.data.id, token);
    playSpecificSong(token, uri);
    resetAnimation(true);
    setTimeout(function () {
      getCurrentPlayback(token);
    }, 400);
  };

  const getPlaylistItems = (playlist_id, token) => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data.items))
      .catch((e) => console.log(e));
  };

  const getItems = async () => {
    const token = await localStorage.getItem("token");
    getPlaylistItems(props.data.id, token);
  };

  useEffect(() => {
    getItems();
  }, []); //eslint-disable-line

  return (
    <div data-test="PlaylistContainer">
      <AnimatePresence>
        {showAlbumDetails ? (
          <motion.div
            key={props.data.id}
            className="Track-Open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <div
              onClick={() => setShowAlbumDetails(!showAlbumDetails)}
              className="Track-Open-Header"
              data-test="Track-Open-Header"
            >
              <img
                src={props.data.images[0].url}
                alt="album cover"
                className="Track-img-open"
              />
              <h4>{props.data.name}</h4>
            </div>
            <div>
              {items.map((track) => (
                <div className="Track-Open-Detail" key={track.track.uri}>
                  <div className="Track-Open-Detail-Icon">
                    <PlayCircleOutlined
                      className="Track-icon"
                      onClick={() => playTheSong(track.track.uri)}
                    />
                  </div>
                  {track.track.name}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            onClick={() => setShowAlbumDetails(!showAlbumDetails)}
            key={props.data.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <div
              className="Track"
              style={{ cursor: "pointer" }}
              data-test="Track"
            >
              <div className="Track-cover-preview">
                <img
                  className="Track-album-cover"
                  src={props.data.images[0].url}
                  alt="album cover"
                />
              </div>
              <div className="Track-information-container">
                {props.data.name.length < 30 ? (
                  <h3 className="Track-information">{props.data.name}</h3>
                ) : (
                  <p className="Track-information">{props.data.name}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
