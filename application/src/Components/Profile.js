import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getQueriesForElement } from '@testing-library/react';
import { getUserInfo } from '../API/spotify'

class Profile extends Component {
  state = {
    user: null,
  };

  async getData() {
    const { user } = await getUserInfo();
    this.setState({ user});
  }
  render() {
    const {user} = this.state;
    return (
      <div>{user.display_name}</div>
    );
  }
}
export default Profile;