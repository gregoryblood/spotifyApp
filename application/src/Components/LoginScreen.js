import React from 'react';
import styled from '@emotion/styled';

const LOGIN_URI =
  'http://localhost:8888/login'

const Login = styled.b`
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: 24;
  }
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: #1DB954;
  text-decoration: none;
  color: white;
  border-radius: 30px;
  padding: 17px 35px;
  position: fixed;
  left: 50%;
  top: 30%;
  margin-left: -80px;
  min-width: 160px;
  font-weight: 700;
  text-align: center;

`;

const LoginScreen = () => (
  <Login>
    <h1>Spotify Profile</h1>
    <LoginButton href={LOGIN_URI}>LOG IN THROUGH SPOTIFY</LoginButton>
  </Login>
);

export default LoginScreen;