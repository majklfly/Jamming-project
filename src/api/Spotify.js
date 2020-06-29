let accessToken;
let userId;

export const spotifySavePlaylist = (playlistName, trackURIs) => {
  console.log(accessToken);
  if (!playlistName || !trackURIs.length) {
    return console.log("empty mate");
  }
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // Return user's ID from Spotify API
  return fetch("https://api.spotify.com/v1/me", {
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      userId = jsonResponse.id;

      // Adds playlist to user's account
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: playlistName }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("API request failed");
          }
        })
        .then((jsonResponse) => {
          const playlistId = jsonResponse.id;

          // Adds tracks to new playlist
          return fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: trackURIs }),
            }
          );
        });
    });
};
