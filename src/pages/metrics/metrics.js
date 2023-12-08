import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getNotification } from '../../components/api/notificationService'
import { Row, Col } from 'react-bootstrap'

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
      <h2>#{notification?.id}</h2>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <h5>
                <i className={notification?.icon}></i> {' '}
                {notification?.title}
              </h5>
            </Col>
            <Col className='text-end'>
              <span className="badge bg-success">
                {notification?.read ? 'read' : ''}
              </span>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: notification?.description,
                }}
              ></div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Metrics
