import React, { useState, Component } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import LoginScreen from './LoginScreen';
import Profile from './Profile';
import { token } from '../API/spotify';

const AppFull = styled.div`
  height: 100%;
  min-height: 100vh;
`;



class App extends Component {
  state = {
    token: '',
  };
  componentDidMount() {
    
    this.setState({ token });
  }
  render() {
    const { token } = this.state;

    console.debug("== Token: " + token);
    return (
      <AppFull>
        
        {token ? <Profile /> : <LoginScreen />}
      </AppFull>
    );
  }
  
}

export default App;
