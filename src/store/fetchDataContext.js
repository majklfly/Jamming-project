import createDataContext from "./createDataContext";
import axios from "axios";

const clientId = "f47451de3cf042f1afad68fe81a8561d";
const redirectUri = "http://localhost:3000/";

const initialState = {
  loading: false,
  error: false,
};

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case "get_userdata":
      return { ...state, userdata: action.payload };
    case "get_token":
      return { ...state, token: action.payload };
    case "get_tracks":
      return { ...state, tracks: action.payload };
    default:
      return state;
  }
};

const fetchUserData = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  if (typeof accessToken === "string") {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers,
    });
    return response.data;
  }
};

const getToken = (dispatch) => {
  return async () => {
    const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (hasAccessToken && hasExpiresIn) {
      const accessToken = hasAccessToken[1];
      const expiresIn = Number(hasExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      const response = await fetchUserData(accessToken);
      dispatch({ type: "get_token", payload: accessToken });
      dispatch({ type: "get_userdata", payload: response });
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  };
};

const spotifySearch = (dispatch) => {
  return async (term, token) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response.status === 200
      ? dispatch({ type: "get_tracks", payload: response.data.tracks.items })
      : console.log(response.status);
  };
};

export const { Context, Provider } = createDataContext(
  fetchReducer,
  { fetchUserData, getToken, spotifySearch },
  initialState
);
