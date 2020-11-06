import React, { useState, Component } from 'react';
import { Switch,
  Route
} from 'react-router-dom';
import styled from '@emotion/styled';

import LoginScreen from './LoginScreen';
import Profile from './Profile';
import Playlist from './Playlist';
import TopTracks from './TopTracks';
import Sort from './Sort';
import Nav from './NavBar';
import { token } from '../API/spotify';

const AppFull = styled.div`
  height: 100%;
  font-family: 'Raleway', sans-serif;
  
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
        {token ? (
          <React.Fragment>
            <Nav/>
            <Switch >
              <Route path="/artists">
                <Profile/>
              </Route>
              <Route path="/tracks">
                <TopTracks/>
              </Route>
              <Route path="/sort">
                <Sort/>
              </Route>
              <Route path="/playlist">
                <Playlist/>
              </Route>
              <Route path="/">
                <Sort/>
              </Route>
            </Switch>
          </React.Fragment>
        ) : (<LoginScreen />)}
      </AppFull>
    );
  }
  
}

export default App;
