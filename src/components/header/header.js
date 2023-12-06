import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import Notification from '../notification/notification'
import axios from 'axios'

const Header = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/anomaly-service-all',
        )
        setNotifications(response.data.data)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    getNotifications()
  }, [])

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Anomaly St.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Notification
          setNotifications={setNotifications}
          notifications={notifications}
        />
      </Container>
    </Navbar>
  )
}

export default Header
