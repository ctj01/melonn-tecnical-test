import React from 'react'
import {Navbar, NavbarBrand, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <>
    <Navbar style={{ background:"#fdfdfd"}} variant="dark">
                <NavbarBrand href="#home" style={{fontWeight:"bold", color:"#66727a"}} as={Link} to={"/"}><img src="https://uploads-ssl.webflow.com/6006f58a9bc1bb84abf7f9b6/6006fbca47ec77fa015be5c6_logo-melonn.png" id="logo" alt="logo" /></NavbarBrand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to={"/"} style={{color: "#6c757d",  fontSize:"20px"}}>Order List</Nav.Link>
                    <Nav.Link as={Link} to={"/createorder"} style={{color: "#6c757d", fontSize:"20px"}}>Create Order</Nav.Link>
                </Nav>
    </Navbar>
        </>
    )
}

export default Header;
