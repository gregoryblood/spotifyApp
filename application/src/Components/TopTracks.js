import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getUserInfo } from '../API/spotify'

const UserImg = styled.img`
  height: 200px;
  width: 200px;
  position: relative;
  left: 50%;
  margin-left: -100px;
  border-radius: 100%;
  margin-top: 100px;
  border-radius: 50%;
  background: #21272C;
  box-shadow:  20px 20px 60px #1b2025, 
              -20px -20px 60px #272e33;
              
  @media(max-width: 768px) {
    height: 100px;
    width: 100px;
    margin-left: -50px;
  }
`;
const Name = styled.div`
  color: #FFFFFF;
  font-weight: 900;
  font-size: 48px;
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: block;
  @media(max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
    
  }
`;
const ArtistBlock = styled.div`
  border-radius: 50px;
  background: #454545;
  heigth: 100px;
  width: 450px;
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
    border-radius: 50px;
    background: #21272C;
    box-shadow: inset 20px 20px 60px #1b2025, 
                inset -20px -20px 60px #272e33;
  }
  @media(max-width: 768px) {
    font-size: 12px;
    margin: 15px 0px;
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
  @media(max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
    
  }
`;

class TopTracks extends Component {
  state = {
    user: null,
    tracks: null,

  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const { user, tracks} = await getUserInfo();
    this.setState({ user, tracks});
  }
  newName(name) {
    if (name.length > 24) {
      return name.slice(0,24).concat("..");
    }
    return name;
  }
  getPic(array) {
    for (var i = array.length; i >= 0; i--) {
      if (array[i])
        return array[i].url;
    }
  }
  render() {
    const {user, tracks} = this.state;
    return (
      <React.Fragment>
        {user ? (
          <React.Fragment>
            <UserImg src={user.images[0].url}></UserImg>
            <Name>{user.display_name}'s Top Tracks</Name>
            <ArtistFlex>
                {tracks.items.map((track, i) => (
                  <ArtistBlock key = {i}>
                    <ArtistImg>
                      {track.album.images.length && <ArtistImgSrc src={this.getPic(track.album.images)} alt=""/>}
                    </ArtistImg>
                    <ArtistName >
                      {this.newName(track.name)}
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
export default TopTracks;