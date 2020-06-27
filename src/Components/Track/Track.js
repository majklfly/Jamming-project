import React, { useState } from "react";
import "./Track.css";

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
    return (
      <i className="Track-action fa fa-plus-circle" onClick={addTrack}></i>
    );
  };

  const togglePlayPreview = () => {
    const audio = this.refs.audio;
    if (!this.state.currentlyPlaying) {
      audio.play();
      this.setState({
        currentlyPlaying: true
      });
    } else {
      audio.pause();
      this.setState({
        currentlyPlaying: false
      });
    }
  };

  // audioEnded() {
  //     this.setState({
  //         currentlyPlaying: false
  //     });
  // }

  const renderPreviewIcon = () => {
    if (props.track.preview) {
      if (!currentlyPlaying) {
        return (
          <i
            className="fa fa-play Track-preview-icon"
            aria-hidden="true"
            onClick={togglePlayPreview}
          ></i>
        );
      } else {
        return (
          <i
            className="fa fa-pause Track-preview-icon"
            aria-hidden="true"
            onClick={this.togglePlayPreview}
          ></i>
        );
      }
    } else {
      return (
        <p className="Track-preview-unavailable">
          No <br /> Preview <br />
          Available
        </p>
      );
    }
  };
  return (
    <div className="Track" key={props.track.id}>
      <div className="Track-cover-preview">
        <audio
          ref="audio"
          src={props.track.preview}
          onEnded={() => setCurrentlyPlaying(true)}
        ></audio>
        <div className="Track-preview-container">{renderPreviewIcon()}</div>
        <img
          className="Track-album-cover"
          src={props.track.cover}
          alt="album cover"
        />
      </div>
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
