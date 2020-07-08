import createDataContext from "./createDataContext";
import axios from "axios";

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
    case "get_searchdata":
      return { ...state, searchdata: action.payload };
    case "error_message":
      return { ...state, error: action.payload };
    case "get_playerdata":
      return { ...state, playerdata: action.payload };
    case "get_playlistdata":
      return { ...state, playlistdata: action.payload };
    case "get_albums":
      return { ...state, albums: action.payload };
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

const setExpTime = () => {
  const expTime = new Date();
  expTime.setMinutes(expTime.getMinutes() + 30);
  const time = expTime.getTime();
  localStorage.setItem("expTime", JSON.stringify(time));
};

const tokenSuccess = (dispatch) => {
  return async (token) => {
    localStorage.setItem("token", token);
    setExpTime();
    dispatch({ type: "get_token", payload: token });
    const response = await fetchUserData(token);
    dispatch({ type: "get_userdata", payload: response });
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
        `https://api.spotify.com/v1/search?type=track,album,artist&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.tracks.items.length === 0) {
        dispatch({
          type: "error_message",
          payload: "Not in the database, mate",
        });
      }
      response.status === 200
        ? dispatch({
            type: "get_searchdata",
            payload: response.data,
          })
        : console.log(response.status);
    }
  };
};

const playSpecificSong = (dispatch) => {
  return async (token, trackURI) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/play`,
        JSON.stringify({ uris: [trackURI] }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
};

const addTracksToPlaylist = async (userId, playlistId, trackURIs, token) => {
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

export const getCurrentPlaylists = (dispatch) => {
  return (token) => {
    axios
      .get("https://api.spotify.com/v1/me/playlists?limit=20", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        res.data
          ? dispatch({
              type: "get_playlistdata",
              payload: res.data,
            })
          : dispatch({
              type: "error_message",
              payload: "Something went wrong, mate",
            })
      )
      .catch((e) => console.log(e));
  };
};

export const getCurrentPlayback = (dispatch) => {
  return (token) => {
    axios
      .get("https://api.spotify.com/v1/me/player", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        res.data
          ? dispatch({
              type: "get_playerdata",
              payload: res.data,
            })
          : dispatch({
              type: "error_message",
              payload: "Turn on your spotify, mate",
            })
      )
      .catch((e) => console.log(e));
  };
};

export const getUserData = (dispatch) => {
  return async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (typeof token === "string") {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers,
      });
      dispatch({ type: "get_userdata", payload: response.data });
    }
  };
};

export const getAlbums = (dispatch) => {
  return async (token) => {
    const response = await axios.get(`https://api.spotify.com/v1/me/albums`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "get_albums",
      payload: response.data,
    });
  };
};

export const { Context, Provider } = createDataContext(
  fetchReducer,
  {
    fetchUserData,
    tokenSuccess,
    spotifySearch,
    spotifySavePlaylist,
    cleanErrorMessage,
    getCurrentPlayback,
    getAlbums,
    playSpecificSong,
    getUserData,
    getCurrentPlaylists,
  },
  initialState
);
