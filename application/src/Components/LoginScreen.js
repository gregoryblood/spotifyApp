import React from 'react';
import styled from '@emotion/styled';

const LOGIN_URI =
  'https://spotify-organizer-web.herokuapp.com/login'


const LoginButton = styled.a`
  display: inline-block;
  background-color: #1DB954;
  text-decoration: none;
  color: white;
  border-radius: 30px;
  padding: 17px 35px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -130px;
  width: 200px;
  font-weight: 700;
  text-align: center;
  font-size: 36px;
`;
const Title = styled.div`
  font-size: 120px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 200px;
`;
const Info = styled.div`
  font-size: 24px;
  color: gray;
  font-style: italic;
  text-align: center;
  bottom: 0;
`;
const LoginScreen = () => (
  <React.Fragment>
    <Title>Music Magik</Title>
    <Info>Sort your Music and More</Info>
    <LoginButton href={LOGIN_URI}>Log In</LoginButton>
  </React.Fragment>
);

export default LoginScreen;