import React from "react";

import "./App.css";
import HomeScreen from "../../Screens/HomeScreen";

import { Provider } from "../../store/globalContext";

const App = () => {
  return (
    <>
      <Provider>
        <HomeScreen />
      </Provider>
    </>
  );
};

export default App;
