import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getQueriesForElement } from '@testing-library/react';
import { getUserInfo } from '../API/spotify'

class Profile extends Component {
  async getData() {
    
  }
  render() {
    var user = getUserInfo();
    console.debug("== User: " + user);
    return (
      <h1>Profile: {user}</h1>
    );
  }
}
export default Profile;