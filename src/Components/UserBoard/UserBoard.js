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
          <div className="userBoardInfo">
            <h3>{state.userdata.display_name}</h3>
            <h5>
              {state.userdata.followers.total !== 1
                ? state.userdata.followers.total + " followers"
                : state.userdata.followers.total + " follower"}
            </h5>
          </div>
          <div className="userBoardLinks">
            <img
              className="userBoardIMG"
              src={state.userdata.images[0].url}
              alt="profile_img"
            />
            <a href={state.userdata.external_urls.spotify}>Open Spotify</a>
          </div>
        </div>
      )}
    </>
  );
};
