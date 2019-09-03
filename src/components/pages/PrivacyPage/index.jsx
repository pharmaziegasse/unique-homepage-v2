//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBContainer,
} from 'mdbreact';

class PrivacyPage extends React.Component {
    render() {
        return (
            <MDBContainer className="text-center">
                <h2>Datenschutzerklärung</h2>
                <p>Blablabla</p>
            </MDBContainer>
        );
    }
}

export default PrivacyPage;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
