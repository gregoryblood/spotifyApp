import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getQueriesForElement } from '@testing-library/react';
import { logout } from '../API/spotify'
import icon from '../SpotifyIconGreen.png'
import { useRouteMatch, NavLink } from 'react-router-dom';

const SpotifyIcon = styled.img`
  
  position: absolute;
  left: 30px;
  top: 30px;
  height: 100px;
  width: 100px;

  &:hover {
    cursor: normal;
  }
  @media(max-width: 768px) {
    height: 50px;
    width: 50px;
    
  }
`;
const SignOut = styled.div`
  position: absolute;
  float: right;
  right: 60px;
  top: 60px;

  color: #999999;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: white;
  }
  @media(max-width: 768px) {
    right: 20px;
    top: 40px;
    
  }
`;

const NavBar = styled.div`
  position: fixed;
  background: #21272C;
  height: 100px;
  overflow: hidden;
  bottom: 0;
  width: 100%;

  box-shadow: 0px 0 25px 25px #21272C;
`;
const NavItems = styled.div`
  text-align: center;
  margin: 0px auto;
`;
const NavItem = styled(NavLink)`
  color: #FFFFFF;
  display: inline-block;
  font-size: 36px;
  margin: 0 15px;
  margin-top: 35px;
  text-decoration: none;
  @media(max-width: 768px) {
    font-size: 20px;
  }
  &:hover {
    color: #1DB954;
    cursor: pointer;
  }
  &.active {
    color: #1DB954;
  }
`;


class Nav extends Component {

  render() { 
    function signOut (e) {
      e.preventDefault();
      logout();
    }
    return (
      <React.Fragment>
        <SpotifyIcon src={icon}/>
        <SignOut onClick={signOut}>
          SignOut
        </SignOut>
        <NavBar>
          <NavItems>
            <NavItem to={`/artists`}>

                Top Artists

            </NavItem>
            <NavItem to={`/tracks`}>

                Top Tracks

            </NavItem>
            <NavItem to={`/playlist`}>

                Sort

            </NavItem>
          </NavItems>
        </NavBar>
      </React.Fragment>  
    );
  }
}
export default Nav;