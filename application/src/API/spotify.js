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
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  }
  export const getAccessToken = () => {
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
    //after 1 hour grab a new one
    if (Date.now() - getExpTime() > 1000 * 60 * 60) {
      console.debug("== REFRESHED TOKEN");
      refreshToken();
    }
    console.debug("== Used Storage Token: " + localAccessToken);
    return localAccessToken;
    
  };
  export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
  };


  export const token = getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
 
//Gets user
export const getUser = () => 
  axios.get('https://api.spotify.com/v1/me', { headers });
//gets user's top artists from the last 6 months
export const getArtists = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers });
//gets user's top tracks from the last 6 months
  export const getTopTracks = () =>
axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });
//gets anything related to an individual user
export const getUserInfo = () => {
  return axios
    .all([getUser(), getArtists(), getTopTracks()])
    .then(
      axios.spread((user, artists, tracks) => {
        return {
          user: user.data,
          artists: artists.data,
          tracks: tracks.data
        };
      }),
    );
};
