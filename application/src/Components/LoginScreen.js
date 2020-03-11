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
  background-color: green;
  color: white;
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: lightgreen;
  }
`;

const LoginScreen = () => (
  <Login>
    <h1>Spotify Profile</h1>
    <LoginButton href={LOGIN_URI}>Log in to Spotify</LoginButton>
  </Login>
);

export default LoginScreen;