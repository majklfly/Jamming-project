import React, { useContext } from "react";
import SpotifyLogin from "react-spotify-login";
import "./WelcomeScreen.css";

import { Context as fetchDataContext } from "../../store/fetchDataContext";

const scopes = encodeURIComponent(
  "user-modify-playback-state user-read-playback-state user-read-private user-read-email user-library-read user-read-currently-playing playlist-modify-private playlist-modify-public"
);

export const WelcomeScreen = () => {
  const { tokenSuccess } = useContext(fetchDataContext);
  const onSuccess = (response) => enterProject(response);
  const onFailure = (response) => console.error(response);

  const setExpTime = () => {
    const expTime = new Date();
    expTime.setMinutes(expTime.getMinutes() + 30);
    const timeFormated = expTime.getTime();
    localStorage.setItem("expTime", JSON.stringify(timeFormated));
  };

  const enterProject = (response) => {
    tokenSuccess(response.access_token);
    setExpTime();
  };

  return (
    <div className="WelcomeScreen">
      <h1>
        Ja<span className="highlight">mm</span>ing
      </h1>
      <div className="welcome-text">
        <h2>Jamming is an interactive website using Spotify API</h2>
        <h3>
          1) To enter you will be asked to login and your details will be stored
          for 30minutes.
        </h3>
        <h3>2) Jamming is using cookies to provider better experience.</h3>
        <SpotifyLogin
          clientId={process.env.REACT_APP_CLIENTID}
          redirectUri={"https://jamming-project.herokuapp.com/"}
          scope={scopes}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Enter"
          className="enterButton"
        />
      </div>
      <h4 className="footer">Created by Michal Mucha @2020 with ReactJS</h4>
    </div>
  );
};
