import React, { Component } from 'react';
import styled from '@emotion/styled';
import { getQueriesForElement } from '@testing-library/react';
import { getUserInfo } from '../API/spotify'

const Bar = styled.span`
  width: 100%;
  margin:0;
  padding: 0;
  height: 100px;
  background: black;
`;
const SignOut = styled.div`
  float: right;
  margin-right: 4vw;
  margin-top: 4vw;
  color: #999999;
  text-decoration: underline;
`;




class Nav extends Component {
render() {
    return (
      <React.Fragment>
        <Bar>
          <SignOut>Sign Out</SignOut>
        </Bar>
      </React.Fragment>  
    );
  }
}
export default Nav;