import * as React from 'react';

import ModalBtn from "../../../atoms/ModalBtn"

import Text from "../../../helpers/Text";
import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser'; 

import Signet from '../../../../assets/signet.png';

class Features extends React.Component{

    renderItem = (item) => {
        let IconClass = "fas fa-"+item.icon+" fa-2x";
        return(
            <div className="row">
                <div className="col-auto pl-0 pr-1 pt-2">
                    {item.icon.toLowerCase().trim() === 'signet' ? (
                        <img src={Signet} height="32px" width="32px" alt="Signet"/>
                    ) : (
                        <i className={IconClass}></i>
                    )}
                    
                </div>
                <div className="col text-left">
                    <p 
                      className="lead mb-0"
                      dangerouslySetInnerHTML={
                        {
                          __html: ReactHtmlParser(renderToString(<Text value={ item.head }/>))
                        }}>
                    </p>
                    <p 
                      dangerouslySetInnerHTML={
                        {
                          __html: ReactHtmlParser(renderToString(<Text value={ item.text }/>))
                        }}>
                    </p>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div className="container">
                {this.props.showHead === true &&
                    <h2 className="font-weight-bold"
                        dangerouslySetInnerHTML={
                          {__html: ReactHtmlParser(renderToString(<Text value={ this.props.title }/>))}}>
                    </h2>
                }
                    <h4 className="text-muted" 
                        dangerouslySetInnerHTML={
                          {__html: ReactHtmlParser(renderToString(<Text value={ this.props.lead }/>))}}>
                    </h4>
                    <div className="row mt-5 mx-1">
                        {this.props.items.map((item, index) => {
                            return(
                                <div key={index} className="col-md-6">
                                    {this.renderItem(item)}
                                </div>
                                );
                        })}
                    </div>
                    <ModalBtn param={this.props.btn} />
                
            </div>
        )
    }
}

export default Features;