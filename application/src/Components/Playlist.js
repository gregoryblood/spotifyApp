import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getCertainPlaylist, 
          getHashParams, 
          createPlaylist, 
          getUserInfo,
          getTrackInfo,
          addTracksToPlaylist,
          getPlaylistData, 
          } from '../API/spotify'

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
  border-color: #1DB954;
  border-width: 2px;
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
  margin-bottom: 150px;
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
    user: null,
    newPlaylist: null,
  };
  
  componentDidMount() {
    const name = getHashParams();
    this.getData(name[Object.keys(name)[0]]);
  }
  async getData(id) {
    const { playlist } = await getCertainPlaylist(id);
    const { user } = await getUserInfo();
    this.setState({ playlist, user });
  }

  getPic(array) {
    for (var i = array.length; i >= 0; i--) {
      if (array[i])
        return array[i].url;
    }
  }
  //Adds array to playlist
  addToPlaylist = async (id, array) => {
    await addTracksToPlaylist(id, array);
    window.location.assign(`http://localhost:3000/sort`);
  }
  async getData(id) {
    const { playlist } = await getCertainPlaylist(id);
    const { user } = await getUserInfo();
    this.setState({ playlist, user });
  }
  makePlaylist = async () => {
    const { playlist, user, newPlaylist } = this.state;
    const name = `${playlist.name}+`;

    const userId = user.id;
    if (user && name) {
      
      const { newPlaylist } = await getPlaylistData(userId, name);
      this.setState({ playlist, user, newPlaylist });
      
      var ids = [];
      for(var i = 0; i < playlist.tracks.items.length; i++) {
        ids.push(`${playlist.tracks.items[i].track.id}`);
      }
      
      const { audioFeatures } = await getTrackInfo(ids);

      var array = [], key, j;
      //Add the first
      for (var i = 0; i < playlist.tracks.items.length; i++) {
        array.push(audioFeatures.audio_features[i]);
      }
      //INSERTION SORT! 
      for(var i = 1; i < playlist.tracks.items.length; i++) {
        key = array[i];
        j = i - 1;
        while (j >= 0 && array[j].energy > key.energy) {
          array[j+1] = array[j];
          j = j - 1;
        }
        array[j + 1] = key;
      }
      var newids = [];
      //Array now has playlists ordered based from energy.
      for (var i = 0; i < playlist.tracks.items.length; i++) {
        //console.log(array[i].energy);
        newids.push(`${array[i].uri}`);
      }
      this.addToPlaylist(newPlaylist.id, newids);
      
    }
  };
  render() {
    const {playlist} = this.state;

    return (
      <React.Fragment>
        {playlist ? (
          <React.Fragment>
            <Sorter onClick={() => this.makePlaylist()}>Sort by Energy</Sorter>
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