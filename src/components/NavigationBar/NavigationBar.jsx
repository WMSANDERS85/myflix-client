import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

export function NavigationBar({isLoggedIn, onLogout}) {
  return (
    <Navbar
      className="mb-4"
      bg="dark"
      variant="dark"
      style={{paddingLeft: 20, borderRadius: '0 0 10px 10px'}}
    >
      <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
      <Nav className="mr-auto">
        {isLoggedIn ? (
          <>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
