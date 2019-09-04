//> React
// Contains all the functionality necessary to define React components
import React from 'react';
// Extended functionality
import classnames from 'classnames/bind'

// Button types
import ButtonType from './btn_types.js';

/**
 * POSSIBLE VALUES
 * R (Rounded)
 */
import ButtonStyle from './btn_styles.js';
/**
 * POSSIBLE VALUES
 * DANGER: Red
 * SUCCESS: Green
 * WARNING: Orange
 * INFO: Light Blue
 * PRIMARY: Blue
 * SECONDARY: Purple
 * WHITE: White
 * ELEGANT: Dark Grey
 * oDANGER: Red (outline)
 * oSUCCESS: Green (outline)
 * oWARNING: Orange (outline)
 * oINFO: Light Blue (outline)
 * oPRIMARY: Blue (outline)
 * oSECONDARY: Purple (outline)
 * oWHITE: White (outline)
 * oELEGANT: Dark Grey (outline)
 */
import ButtonSize from './btn_sizes.js';
/**
 * POSSIBLE VALUES
 * SM (Small)
 * MD (Medium)
 * LG (Large)
 */

// Connect additional visual values with classname
var cbs = classnames.bind(ButtonSize);
var cbst = classnames.bind(ButtonStyle);
var cbt = classnames.bind(ButtonType);

class ModalBtn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visible: false
        }
    }

    // Convert url to Modal
    isModal = () => {
        if(this.exists()){
            if(this.props.param.btnlink === null || this.props.param.btnlink === undefined){
                this.props.param.buttonPage.urlPath = this.props.param.buttonPage.urlPath.replace('/','');
                return true;
            }
            if(this.props.param.btnlink !== null && this.props.param.btnlink !== undefined){
                console.error("Link");
                return false;
            } 
        }
        
    }

    // Check if button should be displayed
    exists = () =>{
        if(this.props.param === undefined || this.props.param === null){
            return false;
        } else {
            if((this.props.param.buttonPage !== null && this.props.param.buttonPage !== undefined) || 
            (this.props.param.btnlink !== null && this.props.param.btnlink !== undefined)){
                return true;
            } else {
                return false;
            }
        }
    }

    // Combine multiple values for className
    getClassProps = () => {
        let props = classnames(
            "btn",
            "font-weight-bold",
            cbst(this.props.btnstyle),
            cbt(this.props.btntype),
            cbs(this.props.size),
            this.props.disabled,
            this.props.className
        )
        return props;
    }
    
    render() {
        console.log(this.props);
        return (
            <div>
                { this.exists() &&
                    <div>
                        {(this.isModal() === true && this.props.handler !== undefined) ? (
                                <button 
                                onClick={() => this.props.handler(this.props.param.buttonPage.urlPath)}
                                className={this.getClassProps()}
                                >
                                    {this.props.param.buttonTitle}
                                </button>
                            ) : (
                                <a href={this.props.param.buttonLink} className={this.getClassProps()}>
                                    {this.props.param.buttonTitle}
                                </a>
                            )
                        }
                    </div>
                }
            </div>
        )
    }
    
}

// Define how a default button should look (without any additional information provided)
ModalBtn.defaultProps = {
    size: ButtonSize.DEFAULT,
    btnstyle: ButtonStyle.WHITE,
    btntype: ButtonType.R,
    className: '',
    disabled: false,
    btnlink: null,
    btntitle: "Unnamed",
    btnhref: ""
}

export default ModalBtn;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
