//> React
// Contains all the functionality necessary to define React components
import React from 'react';

class Section extends React.Component{

    _hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    isDark = () => {
        let r = this._hexToRgb(background).r;
        let g = this._hexToRgb(background).g;
        let b = this._hexToRgb(background).b;
        let rgb = "rgb("+r+","+g+","+b+")";

        let match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(rgb);
        let result = ( match[1] & 255 )
            + ( match[2] & 255 )
            + ( match[3] & 255 )
            < 3 * 256 / 1.2;
        if(result){
            return "section-text-white";
        } else {
            return "section-text-grey";
        }
    }

    render(){
        const { id, children, background } = this.props;

        let sectionStyle = {
            backgroundColor: background
        }

        return(
            <section id={id} className={this.isDark()} style={sectionStyle}>
                {children}
            </section>
        );
    }
}

export default Section;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
