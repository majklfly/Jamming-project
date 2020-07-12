import createDataContext from "./createDataContext";
import axios from "axios";

import { getCurrentPlayback } from "./fetchDataContext";

export const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "get_currentPlayback":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const updateVolume = (dispatch) => {
  return async (token, value) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => null)
      .catch((e) => console.log(e));
  };
};

const updateProgress = (dispatch) => {
  return async (token, value) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => null)
      .catch((e) => console.log(e));
  };
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

const nextSong = (dispatch) => {
  return async (token) => {
    axios
      .post(
        "https://api.spotify.com/v1/me/player/next",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.status === 204 && getCurrentPlayback(token));
  };
};

const previousSong = (dispatch) => {
  return async (token) => {
    try {
      axios.post(
        "https://api.spotify.com/v1/me/player/previous",
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

export const { Context, Provider } = createDataContext(
  reducer,
  {
    playSong,
    pauseSong,
    nextSong,
    previousSong,
    updateVolume,
    updateProgress,
  },
  initialState
);
