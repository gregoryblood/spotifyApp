import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import axios from 'axios';
import LoginScreen from './LoginScreen';

import './App.css';
const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&display=swap');
  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
  }
`;
const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
  'Content-Type': 'application/json',
};
function getAccessToken () {
  axios.post(`https://accounts.spotify.com/api/token`)
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}
const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });
function App() {
  return (
    <div>
      <LoginScreen />
    </div>
  );
}

export default App;
