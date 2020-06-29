import React from "react";

import "./App.css";
import HomeScreen from "./Screens/HomeScreen";

import { Provider as GlobalProvider } from "./store/globalContext";
import { Provider as FetchProvider } from "./store/fetchDataContext";

const App = () => {

  return (
    <>
      <FetchProvider>
        <GlobalProvider>
          <HomeScreen />
        </GlobalProvider>
      </FetchProvider>
    </>
  );
};

export default App;
