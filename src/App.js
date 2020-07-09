import React from "react";
import { CookiesProvider } from "react-cookie";

import HomeScreen from "./Screens/HomeScreen";

import { Provider as GlobalProvider } from "./store/globalContext";
import { Provider as FetchProvider } from "./store/fetchDataContext";
import { Provider as PlayerProvider } from "./store/playerContext";

const App = () => {
  return (
    <>
      <CookiesProvider>
        <PlayerProvider>
          <FetchProvider>
            <GlobalProvider>
              <HomeScreen />
            </GlobalProvider>
          </FetchProvider>
        </PlayerProvider>
      </CookiesProvider>
    </>
  );
};

export default App;
