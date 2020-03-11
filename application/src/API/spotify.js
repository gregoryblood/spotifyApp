import axios from 'axios';

export const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    console.debug(q);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    
    return hashParams;
  };
  export const getAccessToken = () => {
    const access_token = getHashParams();
    
    return access_token;
  };
  export const token = getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });
  export const getUserInfo = () => {
    return axios
      .all([getUser()])
      .then(
        axios.spread((user) => {
          return {
            user: user.data,

          };
        }),
      );
  };