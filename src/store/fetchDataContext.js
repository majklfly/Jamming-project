import createDataContext from "./createDataContext";
import axios from "axios";

const clientId = "91676161ae734812a2d87002a4246b27";
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
    case "error_message":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const cleanErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "error_message", payload: null });
  };
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
      let accessToken = hasAccessToken[1];
      const expiresIn = Number(hasExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      const response = await fetchUserData(accessToken);
      dispatch({ type: "get_token", payload: accessToken });
      dispatch({ type: "get_userdata", payload: response });
    } else {
      const scopes = encodeURIComponent(
        "user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing"
      );
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  };
};

const spotifySearch = (dispatch) => {
  return async (term, token) => {
    if (term.length === 0) {
      dispatch({
        type: "error_message",
        payload: "Drop your favorite song, mate",
      });
    } else {
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
    }
  };
};

const addTracksToPlaylist = async (userId, playlistId, trackURIs, token) => {
  console.log("triggered");
  const response = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
    JSON.stringify({ uris: trackURIs }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

const spotifySavePlaylist = (dispatch) => {
  return async (playlistName, trackURIs, userId, token) => {
    if (!trackURIs.length) {
      dispatch({
        type: "error_message",
        payload: "Add songs to the playlist, mate",
      });
    } else if (!playlistName) {
      dispatch({
        type: "error_message",
        payload: "Missing name of the playlist, mate",
      });
    }
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      JSON.stringify({ name: playlistName }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const playlistId = response.data.id;
    const responseTracks = await addTracksToPlaylist(
      userId,
      playlistId,
      trackURIs,
      token
    );
    responseTracks.status === 201 &&
      dispatch({ type: "error_message", payload: null });
  };
};

export const { Context, Provider } = createDataContext(
  fetchReducer,
  {
    fetchUserData,
    getToken,
    spotifySearch,
    spotifySavePlaylist,
    cleanErrorMessage,
  },
  initialState
);
