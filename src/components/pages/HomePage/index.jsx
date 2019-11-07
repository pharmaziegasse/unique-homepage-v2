//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  
} from 'mdbreact';

//> Queries
import { GET_PAGES } from './query.js';

//> Components
import {
  Hero,
  Features,
  Steps,
} from '../../organisms/sections';

//> Images
// To be added

class HomePage extends React.Component {

  state = {}

  _handleModalChange = (modalId, action) => {
      // Show modal
      this.setState({
        [modalId]: action === 'show' ? true : false
      });
  }
  
  render() {
    const { globalState } = this.props;

    console.log(this.state);

    if(globalState.loaded){
      return (
        <Hero handler={this._handleModalChange} globalState={globalState} />,
        <Features handler={this._handleModalChange} globalState={globalState} />,
        <Steps handler={this._handleModalChange} globalState={globalState}/>
      );
    } else {
      return null;
    }
    
  }
}

export default HomePage;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
