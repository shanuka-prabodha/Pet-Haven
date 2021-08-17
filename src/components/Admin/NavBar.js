import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../images/logo.png';
import Signin from "./Signin";
import React from "react";
import {useHistory} from "react-router-dom";

const linkStyle = {
    color: "#0e0c0c",
    fontFamily: 'Poppins',
    fontWeight: 300

}

const buttonStyle = {
    color: "#fff",
    backgroundColor: "#FA334E",
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderRadius: '6px',
    width: '100px',
    boxShadow: '0px 0px 4px #FA334E'
}


function NavBar(props) {

    const history = useHistory();

    function navigateHome() {

        history.push('/')
    }


    return (
        <div>
            <Navbar className="shadow-sm p-3 navbar-custom admin-navbar" collapseOnSelect expand="lg" variant="dark">
                <img src={logo} alt="shop-logo" className="logo-image"/>
                <Navbar.Brand href="/"></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#/" style={linkStyle} className="mx-3 page-scroll">ADMIN DASHBOARD</Nav.Link>


                    </Nav>
                    <Nav>
                        <Form>

                            <Button variant="contained" style={buttonStyle} onClick={navigateHome}>LogOut</Button>
                        </Form>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;