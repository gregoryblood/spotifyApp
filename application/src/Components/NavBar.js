import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getQueriesForElement } from '@testing-library/react';
import { getUserInfo } from '../API/spotify'
import icon from '../SpotifyIconGreen.png'
const SpotifyIcon = styled.img`
  float: left;
  position: absolute;
  margin-left: 2vw;
  margin-top: 1vw;
  height: 100px;
  width: 100px;
  &:hover {
    cursor: pointer;
  }
`;
const SignOut = styled.div`
  float: right;
  margin-right: 4vw;
  margin-top: 3vw;
  color: #999999;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const NavBar = styled.div`
  position: fixed;
  background: #191414;
  height: 100px;
  overflow: hidden;
  bottom: 0;
  width: 100%;
  box-shadow: 0px 0 25px 25px rgba(0, 0, 0, 0.8);
`;
const NavItems = styled.ul`
  text-align: center;

`;
const NavItem = styled.div`
  color: #FFFFFF;
  display: inline-block;
  font-size: 36px;
  margin: 15px 45px;
  @media(max-width: 768px) {
    font-size: 24px;
    margin: 20px 30px;
    
  }
  &:hover {
    color: #1DB954;
    cursor: pointer;
  }
  &:active {
    color: #1DB954;
  }
`;


class Nav extends Component {
render() {
    return (
      <React.Fragment>
        <SpotifyIcon src={icon}/>
        <SignOut>
          SignOut
        </SignOut>
        <NavBar>
          <NavItems>
          <NavItem>
            Profile
          </NavItem>
          <NavItem>
            Sort
          </NavItem>
          
          </NavItems>
          
        </NavBar>
      </React.Fragment>  
    );
  }
}
export default Nav;