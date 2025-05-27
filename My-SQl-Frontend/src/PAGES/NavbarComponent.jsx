// src/components/NavbarComponent.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/male.png';

const NavbarComponent = () => {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{ backgroundColor: '#343a40', height: '80px'}} // Increased height & color
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-top me-2"
          />
          <span style={{ fontSize: '2.5rem' }}>Admin</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        {/* <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
