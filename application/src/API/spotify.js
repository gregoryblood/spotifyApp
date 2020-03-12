import axios from 'axios';

const setLocalAccessToken = token => {
  window.localStorage.setItem('spotify_access_token', token);
};
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');

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
  export const getAccessToken = () => {
    const localAccessToken = getLocalAccessToken();
    if (!localAccessToken) {
      const access_token = getHashParams();
      return access_token[Object.keys(access_token)[0]];
    }
    return localAccessToken;
    
  };
  export const token = getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  export const getUserInfo = () => {
    axios.get('https://api.spotify.com/v1/me', { headers })
      .then((response) => {
        console.debug("== Data: " + response.data.display_name);
        return response.data.display_name;

      });
  };