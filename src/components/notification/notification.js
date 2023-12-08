import { Dropdown, Row, Col } from 'react-bootstrap'
import './style.css'
import { useNavigate } from 'react-router-dom'

import {
  markReadNotification,
  markReadAllNotifications,
} from '../api/notificationService'

const Notification = ({
  notifications,
  setNotifications,
  getNotifications,
}) => {
  const navigate = useNavigate()

  const updateNotificationReadStatus = async (notification) => {
    const markAsReadRequest = markReadNotification(notification.id)

    if (markAsReadRequest) {
      getNotifications()

      const metricPageRoute = `/metrics/${notification.id}`
      
      navigate(metricPageRoute)
    }
  }

  const updateAllNotificationReadStatus = async () => {
    const client = JSON.parse(localStorage.getItem("client"))
    const markAsRead = markReadAllNotifications(client.id)

    if (markAsRead) {
      getNotifications()
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
                onClick={() => {
                  updateNotificationReadStatus(notification)
                }}
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
                        <div
                        className='notification-description'
                          dangerouslySetInnerHTML={{
                            __html: `${notification.description?.substring(0, 100)}...`,
                          }}
                        ></div>
                      </Col>
                      <Col>
                        {(notification.read || notification.clicked) && (
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
        {notifications.length > 0 && (
          <Dropdown.Item
            onClick={() => updateAllNotificationReadStatus(null, true)}
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
                  <Col sm={12}>Mark all as read</Col>
                </Row>
              </Col>
            </Row>
          </Dropdown.Item>
        )}
        {notifications.length === 0 && (
          <Dropdown.Item
            onClick={() => updateAllNotificationReadStatus(null, true)}
          >
            <em>You have no notifications</em>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Notification
