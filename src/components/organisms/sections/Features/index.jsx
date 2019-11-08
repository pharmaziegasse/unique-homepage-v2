//> React
// Contains all the functionality necessary to define React components
import * as React from 'react';
// Render HTML
import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser'; 

//> Components
import ModalBtn from '../../../atoms/ModalBtn';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdbreact';

//> Helpers
import Text from '../../../helpers/Text';

//> Images
import Signet from '../../../../assets/signet.png';

class Features extends React.Component{

  renderItem = (item) => {
    const { 
      feature_head,
      feature_icon,
      feature_paragraph,
    } = item.value;

    let IconClass = "fas fa-"+feature_icon+" fa-2x";
    return(
      <MDBRow>
        <MDBCol auto className="pl-0 pr-1 pt-2">
          {feature_icon.toLowerCase().trim() === 'signet' ? (
            <img src={Signet} height="32px" width="32px" alt="Signet"/>
          ) : (
            <i className={IconClass}></i>
          )}
        </MDBCol>
        <MDBCol className="text-left">
          <p 
            className="lead mb-0"
            dangerouslySetInnerHTML={
            {
              __html: ReactHtmlParser(renderToString(<Text value={ feature_head }/>))
            }}>
          </p>
          <p 
            dangerouslySetInnerHTML={
            {
              __html: ReactHtmlParser(renderToString(<Text value={ feature_paragraph }/>))
            }}>
          </p>
        </MDBCol>
      </MDBRow>
    );
  }

  render(){

    const { globalState, data } = this.props;

    // Section data
    const { 
      featuresDisplayhead,
      featuresHead,
      featuresSubhead,
      featuresFeatures,
      featuresButton,
    } = data;
    
    //> Debugging
    console.log(data);

    return(
      <MDBContainer>
        {featuresDisplayhead === true &&
            <h2 className="font-weight-bold"
                dangerouslySetInnerHTML={
                  {__html: ReactHtmlParser(renderToString(<Text value={ featuresHead }/>))}}>
            </h2>
        }
        <h4 className="text-muted" 
            dangerouslySetInnerHTML={
              {__html: ReactHtmlParser(renderToString(<Text value={ featuresSubhead }/>))}}>
        </h4>
        <MDBRow className="mt-5 mx-1">
            {featuresFeatures.map((item, index) => {
                return(
                    <div key={index} className="col-md-6">
                        {this.renderItem(item)}
                    </div>
                    );
            })}
        </MDBRow>
        <ModalBtn param={featuresButton} />
      </MDBContainer>
    )
  }
}

export default Features;