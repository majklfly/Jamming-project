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
        <h2 style={{ color: "white" }}>
          This Page is designated to interact with Spotify.
        </h2>
        <h3 style={{ color: "white" }}>
          1) To enjoy fully the website, please play a song on your device.
        </h3>
        <h3 style={{ color: "white" }}>
          2) With enter you will be asked to login to your account and will
          recieve a token, which will be valid and stored for 30 minutes.
        </h3>
        <h3 style={{ color: "white" }}>
          3) This token is stored in the cookies of your browser.
        </h3>
        <SpotifyLogin
          clientId={"91676161ae734812a2d87002a4246b27"}
          redirectUri={"http://localhost:3000/"}
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
