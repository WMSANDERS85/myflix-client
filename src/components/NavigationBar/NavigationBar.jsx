import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

export function NavigationBar({isLoggedIn, onLogout}) {
  return (
    <Navbar bg="dark" variant="dark">
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
