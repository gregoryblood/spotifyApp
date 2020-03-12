import React, { useState, Component } from 'react';
import { Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch } from 'react-router-dom';
import styled from '@emotion/styled';

import LoginScreen from './LoginScreen';
import Profile from './Profile';
import Nav from './NavBar';
import { token } from '../API/spotify';

const AppFull = styled.div`
  height: 100%;
  
  background: #191414;
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
              <Route path="/">
                <Profile path="/"/>
              </Route>
              
            </Switch>
            
          </React.Fragment>
        ) : (<LoginScreen />)}
      </AppFull>
    );
  }
  
}

export default App;
