import React, { useContext } from "react";
import "./styles.css";

import { Context } from "../../store/fetchDataContext";

export const UserBoard = () => {
  const { state } = useContext(Context);

  console.log(state);

  return (
    <>
      {state.userdata && (
        <div className="userBoardContainer">
          <div className="userBoardLinks"></div>
        </div>
      )}
    </>
  );
};
