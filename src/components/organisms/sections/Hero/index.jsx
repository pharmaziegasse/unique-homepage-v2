//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBView,
    MDBMask,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBCarousel,
    MDBCarouselCaption,
    MDBCarouselInner,
    MDBCarouselItem,
} from 'mdbreact';

//> Connection to backend
// Apollo GraphQL Query
import { gql } from "apollo-boost";
// GraphQL
import { graphql } from "react-apollo";

//> Helpers
import {
    Text
} from '../../../helpers';
// To help set the HTML of elements
import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser';

//> Components
import {
    ModalBtn,
} from '../../../atoms';

//> CSS
import './hero.scss';

export const GET_HERO = gql`
    query pages($token: String!) {
        page: root(token: $token) {
            rootPage{
                id
                title
                uniquepage{
                    __typename
                    id
                    headers{
                        ... on HomeHero_SlideBlockListBlock{
                            value{
                                __typename
                                slideHead
                                slideSubhead
                                slideImage{
                                    urlLink
                                }
                                slideButton{
                                    id
                                    buttonTitle
                                    buttonLink
                                    buttonPage{
                                        id
                                        urlPath
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } 
`;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */

class Hero extends React.Component{

    _handleModalChange = (modalId) => {
        this.props.handler(modalId, 'show');
    }

    render(){
        
        // Get returned data from Query
        const { data } = this.props;
        
        if(data.page){
            let headers = data.page.rootPage.uniquepage.headers[0].value;
            console.log(headers);
            return(
                <MDBView id="hero">
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <MDBCarousel
                        activeItem={1}
                        length={headers.length}
                        showControls={headers.length > 1}
                        showIndicators={headers.length > 1}
                        className="z-depth-1 w-100 text-white"
                        >
                            <MDBCarouselInner>
                            {headers.map((slide, i) => {
                                console.log(slide);
                                return(
                                <MDBCarouselItem key={i} itemId={i+1}>
                                    <MDBView>
                                        <img
                                        className="w-100"
                                        src={"https://pharmaziegasse.at"+slide.slideImage.urlLink}
                                        />
                                    <MDBMask overlay="black-light flex-center">
                                        <MDBContainer className="hero-content">
                                            <h1 
                                            className="
                                            h1-reponsive
                                            text-uppercase
                                            font-weight-bold
                                            mb-0
                                            pt-md-5
                                            pt-5"
                                            >
                                            <strong dangerouslySetInnerHTML={
                                                {__html: ReactHtmlParser(
                                                    renderToString(<Text value={ slide.slideHead }/>)
                                                    )}
                                                }>
                                            </strong>
                                            </h1>
                                            <h3 
                                            className="my-5 white-text"
                                            >
                                            <strong dangerouslySetInnerHTML={
                                                {__html: ReactHtmlParser(
                                                    renderToString(<Text value={ slide.slideSubhead }/>)
                                                    )}
                                                }>
                                            </strong>
                                            </h3>
                                            <ModalBtn
                                            handler={this._handleModalChange}
                                            size="LG"
                                            param={slide.slideButton}
                                            />
                                        </MDBContainer>
                                    </MDBMask>
                                    </MDBView>
                                </MDBCarouselItem>
                                );
                            })}
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </MDBMask>
                </MDBView>
            );
        } else {
            return(
                null
            );
        }        
    }
}

export default graphql(GET_HERO, {
    options: (props) => ({ variables: { "token": props.globalState.token } })
})( Hero );

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
