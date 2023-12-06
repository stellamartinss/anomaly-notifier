import { Dropdown, Row, Col } from 'react-bootstrap'
import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Notification = ({
  notifications,
  setNotifications
}) => {
  const navigate = useNavigate()

  const updateNotificationReadStatus = async (notification, markAll = false) => {
    try {
        const markAsRead = await axios.post(`http://localhost:3001/anomaly-service/${notification.id}/mark-read`)

        if(markAsRead) {
            const metricPageRoute = `/metrics/${notification.id}`
            navigate(metricPageRoute)
        }

    } catch (error) {
        console.error(`something went wrong ${error}`)
    }

    
 
  }

  return (
    <Dropdown drop="right">
      <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
        <i className="bi bi-bell"></i>
        <span className="badge bg-danger">
          {notifications.filter((item) => !item.read).length}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {notifications.map((notification, index) => {
          return (
            <>
              <Dropdown.Item
                key={notification.id}
                className="border-bottom py-3"
                style={{
                  background: !notification.read ? '#B6E2D3' : 'initial',
                }}
                onClick={() => updateNotificationReadStatus(notification)}
              >
                <Row>
                  <Col sm={1}>
                    <div className="form-check text-right">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="exampleRadio1"
                        name="exampleRadioGroup"
                      />
                    </div>
                  </Col>
                  <Col sm={11}>
                    <Row>
                      <Col sm={12}>
                        <span>
                          <i className={notification.icon}></i>
                        </span>
                        <strong> {notification.title}</strong>
                        <p>{notification.description}</p>
                      </Col>
                      <Col>
                        {notification.read && (
                          <span className="badge bg-success">read</span>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Dropdown.Item>
            </>
          )
        })}
        <Dropdown.Item href="/metrics">
          <Row>
            <Col sm={1}>
              <div className="form-check text-right">
                <input
                  type="radio"
                  className="form-check-input"
                  id="exampleRadio1"
                  name="exampleRadioGroup"
                  onClick={() => updateNotificationReadStatus(null, true)}
                />
              </div>
            </Col>
            <Col sm={11}>
              <Row>
                <Col sm={12}>Mark all as read</Col>
              </Row>
            </Col>
          </Row>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Notification
