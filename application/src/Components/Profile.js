import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getUserInfo } from '../API/spotify'

const UserImg = styled.img`
  height: 100px;
  width: 100px;
  position: relative;
  left: 50%;
  margin-left: -50px;
  border-radius: 100%;
  margin-top: 30px;
  
`;
const Name = styled.div`
  color: #FFFFFF;
  font-weight: 900;
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin: auto;
  display: block;
  
`;
const ArtistBlock = styled.div`
  border-radius: 50px;
  background: #454545;
  heigth: 100px;
  width: 350px;
  margin: 20px;
  display: inline-block;
  display: flex;
  color: #FFFFFF;

  border-radius: 50px;
  background: #21272C;
  box-shadow:  10px 10px 30px #1b2025, 
              -10px -10px 30px #272e33;
  &:hover {
    cursor: default;
    color: #1DB954;
  }

`;
const ArtistFlex = styled.div`
  display: flex;
  width: 80%;
  max-width: 1500px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-conent: center;
`;
const ArtistImg = styled.div`
  margin-top: 4px;
  margin-left: 5px;
  display: inline-block;
`;
const ArtistImgSrc = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 100%;
  margin: 0px;
  padding: 0px;
`;
const ArtistName = styled.div`
  font-size: 150%;
  display: inline-block;
  margin-top: 30px;
  margin-left: 10px;
  &:hover {
    cursor: default;
  }
`;
const Loading = styled.div`
  font-size: 100px;
  width: 100%;
  height: 100%;
  color: white;
  position: fixed;
  top: 40%;
  left: 40%;
`;

class Profile extends Component {
  state = {
    user: null,
    artists: null,

  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const { user, artists} = await getUserInfo();
    this.setState({ user, artists});
  }
  newName(name) {
    if (name.length > 18) {
      return name.slice(0,18).concat("..");
    }
    return name;
  }
  render() {
    const {user, artists} = this.state;
    return (
      <React.Fragment>
        {user ? (
          <React.Fragment>
            <UserImg src={user.images[0].url}></UserImg>
            <Name>{user.display_name}</Name>
            <ArtistFlex>
                {artists.items.map((artist, i) => (
                  <ArtistBlock key = {i}>
                    <ArtistImg>
                      {artist.images.length && <ArtistImgSrc src={artist.images[2].url} alt="Artist" />}
                    </ArtistImg>
                    <ArtistName >
                      {this.newName(artist.name)}
                    </ArtistName>
                  </ArtistBlock>
                  
                ))}
            </ArtistFlex>
          </React.Fragment>
        ) : (
          <Loading>Loading...</Loading>
        )}
      </React.Fragment>  
    );
  }
}
export default Profile;