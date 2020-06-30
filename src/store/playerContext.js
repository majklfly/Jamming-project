import createDataContext from "./createDataContext";
import axios from "axios";

export const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "get_currentPlayback":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const playSong = (dispatch) => {
  return async (token) => {
    try {
      axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
};

const pauseSong = (dispatch) => {
  return async (token) => {
    try {
      axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
};

const getCurrentPlayback = (dispatch) => {
  return async (token) => {
    axios
      .get("https://api.spotify.com/v1/me/player", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        dispatch({ type: "get_currentPlayback", payload: res.data })
      );
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    playSong,
    pauseSong,
    getCurrentPlayback,
  },
  initialState
);
