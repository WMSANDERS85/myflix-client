import React from 'react';
import {Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap';

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">My-Flix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="primary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
