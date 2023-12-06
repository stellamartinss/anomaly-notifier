import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Metrics = () => {
  const { notificationId } = useParams()

  const [notification, setNotification] = useState({})

  useEffect(() => {
    
    const getNotification = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/anomaly-service/${notificationId}`
        );

        setNotification(response.data.data)
      } catch (error) {
        console.error('Error fetching notification:', error)
      }
    }

    getNotification()
  }, [notificationId])

  return (
    <Container className="mt-5">
      <h2>Anomaly Service #{notification.id}</h2>
      <Card>
        <Card.Header>
          <h5>
            <i className={notification.icon}></i>
            {notification.title}
          </h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Description:</strong>
              <br />
              <p>{notification.description}</p>

              {notification.read ? 'Read' : ''}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Metrics
