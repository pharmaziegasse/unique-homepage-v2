//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBContainer,
    MDBSmoothScroll,
    MDBBtn,
} from 'mdbreact';

//> CSS
import './navbar.scss';

// React Logo
import { ReactComponent as Logo } from '../../../assets/logo/logo.svg';

//> Navbar Data
const navItems = [
    { to: "steps", text: "So funktioniert's", active: false, type: "text" },
    { to: "features", text: "Warum PHARMAZIEGASSE<sup>®</sup>", active: false, type: "text" },
    { to: "manifest", text: "Über uns", active: false, type: "text" },
]

class Navbar extends React.Component{
    state = {
        collapseID: ""
    };

    toggleCollapse = (collapseID) => () =>
        this.setState((prevState) => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    closeCollapse = (collapseID) => () => {
        window.scrollTo(0, 0);
        this.state.collapseID === collapseID && this.setState({ collapseID: "" });
    };

    render(){
        const overlay = (
        <div
            id="sidenav-overlay"
            style={{ backgroundColor: "transparent" }}
            onClick={this.toggleCollapse("mainNavbarCollapse")}
        />
        );

        const { collapseID } = this.state;
        return(
            <div>
                <MDBNavbar className="z-depth-0" dark expand="md" fixed="top" scrolling>
                <MDBContainer>
                    <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
                        <Logo />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                    onClick={this.toggleCollapse("mainNavbarCollapse")}
                    />
                    <MDBCollapse
                    id="mainNavbarCollapse"
                    isOpen={this.state.collapseID}
                    navbar
                    >
                    <MDBNavbarNav className="align-items-center" right>
                        {navItems.map((item, i) => {
                            return(
                                <MDBNavItem key={i}>
                                    <MDBSmoothScroll 
                                    to={item.to}
                                    onClick={this.closeCollapse("mainNavbarCollapse")}
                                    >
                                    <strong>{item.text}</strong>
                                    </MDBSmoothScroll>
                                </MDBNavItem>
                            );
                        })}
                        {/*<SocialLinks items={sociallinks} />*/}
                        <MDBNavItem>
                            <MDBBtn color="white" rounded>
                                Loslegen
                            </MDBBtn>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            {collapseID && overlay}
            </div>
        );
    }
}

export default Navbar;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
