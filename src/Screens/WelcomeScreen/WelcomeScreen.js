import React, { useContext } from "react";
import SpotifyLogin from "react-spotify-login";
import "./WelcomeScreen.css";

import { Context as fetchDataContext } from "../../store/fetchDataContext";

export const WelcomeScreen = () => {
  const { tokenSuccess } = useContext(fetchDataContext);

  const onSuccess = (response) => tokenSuccess(response.access_token);
  const onFailure = (response) => console.error(response);
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
          You need to turn on your player to fully enjoy the app
        </h3>
        <SpotifyLogin
          clientId={"91676161ae734812a2d87002a4246b27"}
          redirectUri={"https://jamming-project.herokuapp.com/"}
          scope={"user-read-private"}
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
