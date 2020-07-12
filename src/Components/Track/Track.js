import React, { useContext } from "react";
import "./Track.css";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Context } from "../../store/globalContext";
import { Context as DataContext } from "../../store/fetchDataContext";
import { useCookies } from "react-cookie";

const Track = (props) => {
  const { addTrack, removeTrack, resetAnimation } = useContext(Context);
  const { playSpecificSong } = useContext(DataContext);
  const [cookies] = useCookies(["token"]);

  const playTheSong = (uri) => {
    playSpecificSong(cookies.token, uri);
    resetAnimation(true);
  };

  return (
    <div className="Track" key={props.track.id} data-test="Track">
      <div className="Track-cover-preview">
        {props.track.album ? (
          <img
            className="Track-album-cover"
            src={props.track.album.images[2].url}
            alt="album cover"
            data-test="Track-album-cover"
          />
        ) : (
          <>
            {props.track.images.length > 0 && (
              <img
                className="Track-album-cover"
                src={props.track.images[2].url}
                alt="album cover"
              />
            )}
          </>
        )}
      </div>
      <div
        className="Track-information-container"
        data-test="Track-information-container"
      >
        {props.track.name.length < 30 ? (
          <h3 className="Track-information">{props.track.name}</h3>
        ) : (
          <p className="Track-information">{props.track.name}</p>
        )}

        <p className="Track-artist">
          {props.track.album &&
            props.track.artists[0].name + " | " + props.track.album.name}
        </p>
      </div>
      {props.isRemoval ? (
        <DeleteOutlined
          onClick={() => removeTrack(props.track)}
          className="Track-icon"
        />
      ) : (
        <div className="Track-icons-container">
          {props.track.album ? (
            <>
              {" "}
              <PlayCircleOutlined
                className="Track-icon"
                onClick={() => playTheSong(props.track.uri)}
              />
              <PlusCircleOutlined
                onClick={() => addTrack(props.track)}
                className="Track-icon"
              />
            </>
          ) : (
            <>
              <a
                href={props.track.external_urls.spotify}
                style={{ color: "white" }}
              >
                <InfoCircleOutlined className="Track-icon" />
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;
