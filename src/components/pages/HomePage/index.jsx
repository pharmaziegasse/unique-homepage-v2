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

//> Backend Connection
// Apollo
import { 
  withApollo
} from "react-apollo";

//> Images
// To be added

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      page: undefined,
    }
  }

  componentDidMount = () => {
    this._fetchData(this.props.globalState.token);
  }

  _handleModalChange = (modalId, action) => {
    // Show modal
    this.setState({
      [modalId]: action === 'show' ? true : false
    });
  }

  _fetchData = (token) => {
    this.props.client.query({
      query: GET_PAGES,
    variables: { "token": token }
    }).then(({data}) => {
      if(data.page){
        this.setState({
          page: data.page.rootPage.uniquepage
        });
      } else {
        this.setState({
          page: undefined
        }, () => console.error("No page data available."));
      }
    })
    .catch(error => {
      console.error(error.message);
    });
  };
  
  render() {
    const { globalState } = this.props;
    // Fetched page CMS data
    const { page } = this.state;

    if(this.state.page){
      /*return (
        <Hero handler={this._handleModalChange} globalState={globalState} />,
        <Features handler={this._handleModalChange} globalState={globalState} />,
        <Steps handler={this._handleModalChange} globalState={globalState}/>
      );*/
      return (
        <>
        <Hero 
        handler={this._handleModalChange}
        globalState={globalState}
        />
        {page.sections.map((section, i) => {
          switch(section.__typename){
            case 'Home_S_FeaturesBlock':
              return(
                <Features 
                handler={this._handleModalChange}
                globalState={globalState}
                data={section}
                />
              );
            default:
              return null;
          }
        })}
        </>
      );
    } else {
      return (
        <Hero handler={this._handleModalChange} globalState={globalState} />
      );
    }
    
  }
}

export default withApollo(HomePage);

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
