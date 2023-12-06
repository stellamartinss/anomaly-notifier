import React from 'react'
import { Nav, Navbar, Button, Dropdown, Container } from 'react-bootstrap'
import Notification from '../notification/notification'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Notification />
      </Container>
    </Navbar>
  )
}

export default Header
