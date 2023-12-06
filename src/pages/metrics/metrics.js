import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {
  getNotification
} from '../../components/api/notificationService'

const Metrics = () => {
  const { notificationId } = useParams()

  const [notification, setNotification] = useState({})

  useEffect(() => {
    
    const getNotificationData = async () => {
      try {
        const response = await getNotification(notificationId)

        setNotification(response)
      } catch (error) {
        console.error('Error fetching notification:', error)
      }
    }

    getNotificationData()
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
