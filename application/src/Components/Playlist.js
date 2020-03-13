import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getCertainPlaylist, getHashParams } from '../API/spotify'

const Sorter = styled.div`
  font-size: 48px;
  color: white;
  text-align: center;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 40px;
  width: 400px;
  padding: 20px 10px;
  border-style: solid;
  border-color: grey;
  border-width: 1px;
  border-radius: 50px;
  &:hover, &:focus {
    cursor: pointer;
    background: #1DB954;
    border-color: #1DB954;
  }
  @media(max-width: 768px) {
    width: 90%;
    font-size: 24px;
  }
`;
const Tip = styled.div`
  font-size: 24px;
  color: grey;
  text-align: center;
  font-style: italic;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 50px;
  
`;
const TrackBlock = styled.div`
  heigth: 100px;
  width: 100%;
  margin-bottom: 20px;
  
  color: #FFFFFF;
  display: flex;
  background: #21272C;
  &:hover {
    cursor: default;
    color: #1DB954;
  }
  @media(max-width: 768px) {
    width: 100%;
    font-size: 12px;
    margin-left: 0;
    margin-right: 0;
  }
`;
const TrackFlex = styled.div`
  display: flex;
  width: 95%;
  max-width: 1500px;
  margin: 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  justify-conent: center;
  @media(min-width: 768px) {
    border-radius: 35px;
    background: #21272C;
    box-shadow:  10px 10px 30px #1b2025, 
                -10px -10px 30px #272e33;
  }
`;

const TrackName = styled.div`
  font-size: 150%;
  display: inline;
  margin-top: auto;
  margin-left: 10px;
  
  
`;
const TrackArtist = styled.div`
  font-size: 150%;
  display: inline-block;
  color: grey;
  margin-top: auto;
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
  @media(max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
    
  }
`;

class Playlist extends Component {
  state = {
    playlist: null,

  };
  componentDidMount() {
    const name = getHashParams();
    this.getData(name[Object.keys(name)[0]]);
  }
  async getData(id) {
    const { playlist } = await getCertainPlaylist(id);
    this.setState({ playlist });
  }

  getPic(array) {
    for (var i = array.length; i >= 0; i--) {
      if (array[i])
        return array[i].url;
    }
  }
  render() {
    const {playlist} = this.state;
    return (
      <React.Fragment>
        {playlist ? (
          <React.Fragment>
            <Sorter>Sort by Energy</Sorter>
            <Tip>A new playlist will be created</Tip>
            <TrackFlex>
              {playlist.tracks.items.map((tracks, i) => (
                <TrackBlock key = {i}>
                  <TrackName >
                     {tracks.track.name}
                  </TrackName>
                  <TrackArtist>
                    - {tracks.track.artists[0].name}
                  </TrackArtist>
                </TrackBlock>
              ))}
            </TrackFlex>
          </React.Fragment>  
        ) : (
          <Loading>Loading...</Loading>
        )}
      </React.Fragment>  
    );
  }
}
export default Playlist;