import React, { useReducer } from "react";
import "./App.css";

import HomeScreen from "../../Screens/HomeScreen";

export const Context = React.createContext();

const initialState = {
  tracks: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add_track":
      return { ...state, tracks: [...state.tracks, action.track] };
    default:
      return state;
  }
};

const App = () => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Context.Provider value={{ globalState, dispatch }}>
        <HomeScreen />
      </Context.Provider>
    </>
  );
};

export default App;
