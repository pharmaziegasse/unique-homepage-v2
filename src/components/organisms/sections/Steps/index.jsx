import * as React from 'react';

import { ApolloConsumer } from 'react-apollo';
import { gql } from "apollo-boost";

import ModalBtn from "../../../atoms/ModalBtn"

import Text from "../../../helpers/Text";
import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser'; 

const GET_IMAGE = gql`
    query img(
            $token: String!
            $id: Int!
        ){
        image(
            token: $token
            id: $id
        ){
            urlLink
        }
    }
`;

class Steps extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    onImgFetched = (img, id) => {
        this.setState({[id]: img});
    }

    renderImg = (image_id, key) => {
        return(
            <ApolloConsumer>
                {client => (
                    <div className="imgcontainer">
                        <div className="img-profile-container" onClick={
                            async function(){
                                let { data } = await client.query({
                                    query: GET_IMAGE,
                                    variables: { "id": image_id, "token": this.props.token }
                                });
                                if(data !== undefined){
                                    this.onImgFetched(data.image, key)
                                }
                            }.bind(this)
                        }>
                            {this.state[key] && <img className="img-fluid w-100" 
                            src={"https://pharmaziegasse.at"+this.state[key].urlLink} 
                            alt={"step "+(key+1)} />}
                        </div>
                    </div>
                )}
            </ApolloConsumer>
        )
    }

    renderItem = (item, i) => {
        let IconClass = "far fa-"+item.icon+" fa-2x";
        return (
            <div className="py-2">
                <i className={IconClass}></i>
                <p className="lead mt-3">STEP {i+1}</p>
                <p className="lead">{ReactHtmlParser(renderToString(<Text value={ item.head }/>))}</p>
                <p dangerouslySetInnerHTML={
                {__html: ReactHtmlParser(renderToString(<Text value={ item.text }/>))}
                }>
                </p>
            </div>
        )
    }

    isOdd = (i) => {
        return Math.abs(i % 2) === 1;
    }

    renderElaborateItem = (item, i) => {
        let IconClass = "fas fa-"+item.icon+" fa-2x";
        let rowClass = "row d-flex";

        if(!this.isOdd(i)){
        rowClass += " flex-row-reverse";
        }

        return(
            <div className={rowClass} key={i}>
                <div className="view col-md-6 p-0">
                    
                    {this.renderImg(item.img, i)}
                    <div className="mask img-mask"></div>
                </div>
                <div className="col-md-6 p-0 d-flex justify-content-center">
                    
                    <div className="m-auto pl-5 pr-5">
                        <div className="spacer-4 d-block d-sm-none"></div>
                        <i className={IconClass}></i>
                        <h4 className="mt-3 mb-0 font-weight-bold dark-grey-text">Schritt {i+1}</h4>
                        <p className="lead">{ReactHtmlParser(renderToString(<Text value={ item.head }/>))}</p>
                        <p dangerouslySetInnerHTML={{__html: ReactHtmlParser(renderToString(<Text value={ item.text }/>))}}></p>
                    </div>
                </div>
            </div>
        )
        
    }

    render(){
    if(this.props.simple === true){
            return(
                <div className="container py-5">
                    {this.props.showHead === true &&
                        <h2 className="font-weight-bold" dangerouslySetInnerHTML={
                        {__html: ReactHtmlParser(renderToString(<Text value={ this.props.title }/>))}
                        }>
                        </h2>
                    }
                    <h4 className="text-muted" dangerouslySetInnerHTML={
                    {__html: ReactHtmlParser(renderToString(<Text value={ this.props.lead }/>))}
                    }>
                    </h4>
                    <div className="row d-flex justify-content-center mt-5">
                        {this.props.items.map((item, index) => {
                            return(
                                <div key={index} className="col-md-3">
                                    {this.renderItem(item, index)}
                                </div>
                                );
                        })}
                    </div>
                    <ModalBtn param={this.props.btn} />
                </div>
            )
        } else {
            return(
                <div className="container py-5">
                    {this.props.showHead === true &&
                        <h2 className="font-weight-bold" dangerouslySetInnerHTML={
                        {__html: ReactHtmlParser(renderToString(<Text value={ this.props.title }/>))}
                        }>
                        </h2>
                    }
                    <h4 className="text-muted mb-5" dangerouslySetInnerHTML={
                    {__html: ReactHtmlParser(renderToString(<Text value={ this.props.lead }/>))}
                    }>
                    </h4>
                    
                    {this.props.items.map((item, index) => {
                        return(
                            this.renderElaborateItem(item, index)
                        );
                    })}
                    <ModalBtn className="mt-5" param={this.props.btn} />
                </div>
            )
        }
    }
}

export default Steps;