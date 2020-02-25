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

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
var params = getHashParams();
var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;


const headers = {
  Authorization: `Bearer ${access_token}`,
  'Content-Type': 'application/json',
};



function App() {
  return (
    <div>
      <LoginScreen />
      <h2>{access_token}</h2>
    </div>
  );
}

export default App;
