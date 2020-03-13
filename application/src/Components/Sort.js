import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getUserPlaylists } from '../API/spotify'

const Title = styled.div`
  font-size: 48px;
  color: white;
  text-align: center;
  margin: 40px;
  margin-top: 100px;
  
`;
const PlaylistBlock = styled(Link)`
  border-radius: 50px;
  background: #454545;
  heigth: 100px;
  width: 350px;
  margin: 10px;
  text-decoration: none;
  color: #FFFFFF;
  display: flex;

  &:hover {
    cursor: pointer;
    color: #1DB954;
  }
`;
const PlaylistFlex = styled.div`
  display: flex;
  width: 80%;
  max-width: 1500px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-conent: center;
`;
const PlaylistImg = styled.div`
  margin-top: 4px;
  margin-left: 5px;
  display: inline-block;
`;
const PlaylistImgSrc = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 100%;
  margin: 0px;
  padding: 0px;
`;
const PlaylistName = styled.div`
  
  font-size: 150%;
  display: inline-block;
  margin-top: 30px;
  margin-left: 10px;
  
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

class Sort extends Component {
  state = {
    playlists: null,

  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const { playlists } = await getUserPlaylists();
    this.setState({ playlists});
  }
  newName(name) {
    if (name.length > 18) {
      return name.slice(0,18).concat("..");
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
    const {playlists} = this.state;
    return (
      <React.Fragment>
        {playlists ? (
          <React.Fragment>
            <Title>Select a Playlist</Title>
            <PlaylistFlex>
              {playlists.items.map((playlists, i) => (
                <PlaylistBlock key = {i} to={'/playlist/' + playlists.name + "#id=" + playlists.id}>
                  <PlaylistImg>
                    {playlists.images.length && <PlaylistImgSrc src={this.getPic(playlists.images)} alt="playlists" />}
                  </PlaylistImg>
                  <PlaylistName >
                    {this.newName(playlists.name)}
                  </PlaylistName>
                </PlaylistBlock>
              ))}
            </PlaylistFlex>
          </React.Fragment>  
        ) : (
          <Loading>Loading...</Loading>
        )}
      </React.Fragment>  
    );
  }
}
export default Sort;