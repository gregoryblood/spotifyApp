import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getUserInfo } from '../API/spotify'

const UserImg = styled.img `
  margin: 0;
  padding: 0;
  height: 30vw;
  width: 30vw;
  margin-left: -15vw;
  position: relative;
  left: 50%;
  border-radius: 100%;
  
`;
const Name = styled.div `
  color: #FFFFFF;
  font-weight: bold;
  font-size: 5vw;
  text-align: center;
  height: 30vw;
  width: 30vw;
  margin-left: -15vw;
  position: relative;
  left: 50%;
`;

class Profile extends Component {
  state = {
    user: null,
    artists: null,
    tracks: null,
  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const { user, artists, tracks } = await getUserInfo();
    this.setState({ user, artists, tracks});
  }
  render() {
    const {user, artists, tracks} = this.state;
    return (
      <React.Fragment>
        {user ? (
          <div>
            <UserImg src={user.images[0].url}></UserImg>
            {console.debug(user.images[0].url)}
            <Name>{user.display_name}</Name>
            <div>
              <ul>
                {artists.items.map((artist, i) => (
                  <div key = {i}>
                    <p>{artist.name}</p>
                  </div>
                ))}
              </ul>
              <h1>-------------------------------------------</h1>
              <ul>
                {tracks.items.map((track, i) => (
                  <div key = {i}>
                    <p>{track.name}</p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </React.Fragment>  
    );
  }
}
export default Profile;