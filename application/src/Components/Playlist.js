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
  margin-bottom: 50px;
  width: 400px;
  padding: 20px 10px;
  border-style: solid;
  border-color: grey;
  border-width: 1px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
    background: #1DB954;
    border-color: #1DB954;
  }
`;
const TrackBlock = styled.div`
  
  background: #454545;
  heigth: 100px;
  width: 100%;
  margin-top: -1px;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  color: #FFFFFF;
  display: flex;
  &:hover {
    cursor: default;
    color: #1DB954;
  }
`;
const TrackFlex = styled.div`
  display: flex;
  width: 80%;
  max-width: 1500px;
  margin: 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  justify-conent: center;
`;

const TrackName = styled.div`
  font-size: 150%;
  display: inline-block;
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
            <TrackFlex>
              {playlist.tracks.items.map((tracks, i) => (
                <TrackBlock key = {i}>
                  <TrackName >
                    {tracks.track.name}
                  </TrackName>
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