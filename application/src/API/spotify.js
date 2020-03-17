import axios from 'axios';

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getExpTime = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

export const getHashParams = () => {
  var hash = window.location.hash.substr(1);
  console.debug("== Hash: " + hash);
  var result = hash.split('&').reduce(function (result, item) {
      var parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
  }, {});
  return result;
};
const refreshToken = async() => {
  const { data } = await axios.get(`http://localhost:8888/refresh_token`);
  const { access_token } = data;
  setLocalAccessToken(access_token);
  window.location.reload();
  return;
}

export const getAccessToken = () => {
  //after 1 hour grab a new one
  if (Date.now() - getExpTime() > 1000 * 60 * 60) {
    logout();
    window.location.href = "http://localhost:3000/";

    console.debug("== REFRESHED TOKEN");
    refreshToken();
  }
  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();
  if (!localRefreshToken || localRefreshToken == 'undefined') {
    const refresh_token = getHashParams();
    setLocalRefreshToken(refresh_token[Object.keys(refresh_token)[1]]);
  }
  if (!localAccessToken || localAccessToken == 'undefined') {
    const access_token = getHashParams();
    setLocalAccessToken(access_token[Object.keys(access_token)[0]]);
    return access_token[Object.keys(access_token)[0]];
  }
  
  
  
  console.debug("== Used Storage Token: " + localAccessToken);
  return localAccessToken;
  
};
export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.assign("http://localhost:3000");
};


export const token = getAccessToken();

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};
//Creates a Playlist
export const createPlaylist = (userId, name) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({ name });
  return axios({ method: 'post', url, headers, data });
};
//Adds tracks to a given playlist
export const addTracksToPlaylist = (playlistId, uris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: 'post', url, headers });
};
//Gets user
export const getUser = () => 
  axios.get('https://api.spotify.com/v1/me', { headers });
//gets user's top artists from the last 6 months
export const getArtists = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers });
export const getTracks = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });
//gets a user's playlists
export const getPlaylists = () =>
  axios.get('https://api.spotify.com/v1/me/playlists?limit=50', { headers });

export const getPlaylist = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

//gets features of a track (Needs Track Id)
export const getTrackAudioFeatures = trackIds =>
  axios.get(`https://api.spotify.com/v1/audio-features/?ids=${trackIds}`, { headers });



//gets anything related to an individual user
export const getUserInfo = () => {
  console.debug("== Getting User Info");
  return axios
    .all([getUser(), getArtists(), getTracks()])
    .then(
      axios.spread((user, artists, tracks) => {
        return {
          user: user.data,
          artists: artists.data,
          tracks: tracks.data,
        };
      }),
    );
};

//Gets user Playlists
export const getUserPlaylists = () => {
  console.debug("== Getting User Playlists");
  return axios
    .all([getPlaylists()])
    .then(
      axios.spread((playlists) => {
        return {
          playlists: playlists.data,
        };
      }),
    );
}
//Gets specific playlist
export const getCertainPlaylist = playlistId => {
  console.debug("== Getting User Playlist. ID: " + playlistId);
  return axios
    .all([getPlaylist(playlistId)])
    .then(
      axios.spread((playlist) => {
        return {
          playlist: playlist.data,
        };
      }),
    );
}
//gets track features
export const getTrackInfo = trackIds => {
  console.debug("== Getting TrackIds");
  return axios
    .all([getTrackAudioFeatures(trackIds)])
    .then(
      axios.spread((audioFeatures) => {
        return {
          audioFeatures: audioFeatures.data,
        };
      }),
    );
};
export const getPlaylistData = (user, name) => {
  return axios
    .all([createPlaylist(user, name)])
    .then(
      axios.spread((newPlaylist) => {
        return {
          newPlaylist: newPlaylist.data,
        };
      }),
    );
}

