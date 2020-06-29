import createDataContext from "./createDataContext";

export const initialState = {
  tracks: [],
};

export const globalReducer = (state, action) => {
  switch (action.type) {
    case "add_track":
      return { ...state, tracks: [...state.tracks, action.track] };
    case "remove_track":
      return {
        ...state,
        tracks: state.tracks.filter((track) => track.id !== action.track.id),
      };
    case "set_playlist":
      return { ...state, playlist: action.list };
    default:
      return state;
  }
};

const addTrack = (dispatch) => {
  return (track) => {
    dispatch({ type: "add_track", track });
  };
};

const setPlaylist = (dispatch) => {
  return (list) => {
    dispatch({ type: "set_playlist", list });
  };
};

const removeTrack = (dispatch) => {
  return (track) => {
    dispatch({ type: "remove_track", track });
  };
};

export const { Context, Provider } = createDataContext(
  globalReducer,
  {
    addTrack,
    setPlaylist,
    removeTrack,
  },
  initialState
);
