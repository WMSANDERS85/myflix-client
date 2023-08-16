import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; // Fixed the typo in the import statement

export function NavigationBar({isLoggedIn, onLogout, handleSearch}) {
  return (
    <Navbar
      className="mb-4"
      bg="dark"
      variant="dark"
      style={{paddingLeft: 20, borderRadius: '0 0 10px 10px'}}
    >
      <Container>
        <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
        <Nav className="me-auto">
          {isLoggedIn ? (
            <>
              <Container>
                <Row>
                  <Col xs={3} md={4}>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                  </Col>
                  <Col xs={3} md={4}>
                    <Nav.Link as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                  </Col>
                  <Col xs={3} md={4}>
                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                  </Col>
                </Row>
              </Container>
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

        {/* Moved the search bar outside of the Nav */}
        <Form className="ml-auto">
          {' '}
          {/* Added 'ml-auto' to push the search bar to the right */}
          <Form.Control
            className="mr-sm-2"
            id="search-bar"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          ></Form.Control>
        </Form>
      </Container>
    </Navbar>
  );
}
