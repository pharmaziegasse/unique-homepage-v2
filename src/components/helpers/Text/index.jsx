//> React
// Contains all the functionality necessary to define React components
import React from 'react';

class Text extends React.Component{
    getItem = (segment) => {
        // Regex Expression
        let rx = /(?:^|\W)#(\w+)(?!\w)/g;
        // Get the variable type
        let arr = rx.exec(segment);

        // Preset result variable
        let res = segment;

        if(arr !== null){
            let type = arr[1];
            
            switch(type){
                case "firstname":
                    // Replace the placeholder with corresponding value
                    res = segment.replace(rx, " "+localStorage.getItem('f_n'));
                    break;
                case "lastname":
                    // Replace the placeholder with corresponding value
                    res = segment.replace(rx, " "+localStorage.getItem('f_l'));
                    break;
                case "email":
                    // Replace the placeholder with corresponding value
                    res = segment.replace(rx, " "+localStorage.getItem('f_e'));
                    break;
                case "phone":
                    // Replace the placeholder with corresponding value
                    res = segment.replace(rx, " "+localStorage.getItem('f_p'));
                    break;
                default:
                    res = segment;
            }
        }

        return res;
    }

    // Get text between { }
    getSegment = (text) => {
        let rx = /\{(.*?)\}/g;
        let arr = rx.exec(text);
        if(arr !== null){
            // Get pure selected text
            let segment = arr[1];
            return segment;
        } else {
            return false;
        }
        
    }

    // Remove text between { }
    getPureText = (text) => {
        let rx = /\{(.*?)\}/;
        let res = text.replace(rx, "");
        return res;
    }

    printText = () => {
        let text = this.props.value;
        if(text !== null && text !== undefined){
            if(
                localStorage.getItem('f_n') && 
                localStorage.getItem('f_l') && 
                localStorage.getItem('f_e') && 
                localStorage.getItem('f_p')
            ){
                let segment = this.getSegment(text);
                if(segment){
                    text = this.getItem(segment);
                }
            } else {
                text = this.getPureText(text);
            }
            
            return text;
        } else {
            return null;
        }
        
    }

    render(){
        return this.printText();
    }

}

export default Text;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
