import React, { useContext } from "react";
import "./Track.css";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Context } from "../../store/globalContext";

const Track = props => {
  // const [currentlyPlaying, setCurrentlyPlaying] = useState(false);

  const { addTrack, removeTrack } = useContext(Context);

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
      {props.isRemoval ? (
        <DeleteOutlined
          onClick={() => removeTrack(props.track)}
          className="Track-icon"
        />
      ) : (
        <PlusCircleOutlined
          onClick={() => addTrack(props.track)}
          className="Track-icon"
        />
      )}
    </div>
  );
};

export default Track;
