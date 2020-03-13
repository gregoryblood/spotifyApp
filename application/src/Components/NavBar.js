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
            <NavLink to={`/`}>
              <NavItem > 
                Profile
              </NavItem>
            </NavLink>
            <NavLink to={`/sort`}>
              <NavItem > 
                Sort
              </NavItem>
            </NavLink>
          </NavItems>
        </NavBar>
      </React.Fragment>  
    );
  }
}
export default Nav;