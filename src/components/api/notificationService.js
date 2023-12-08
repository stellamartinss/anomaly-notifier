import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'
const CLIENT = JSON.parse(localStorage.getItem("client"))

export const markReadNotification = async (notificationId) => {
  try {
    const notificationIdList = [notificationId]
    const markAsRead = await axios.post(
      `${BASE_URL}/anomaly-service/${CLIENT.id}/mark-read?messageIds=[${notificationIdList.join(',')}]`,
    )

    return markAsRead.data.success
  } catch (error) {
    console.error(`Something went wrong: ${error}`)
  }
}

export const markReadAllNotifications = async () => {
  try {
    const markAsRead = await axios.post(
      `${BASE_URL}/anomaly-service/${CLIENT.id}/mark-read`,
    )
    
    return markAsRead.data.success
  } catch (error) {
    return null
  }
}

export const getNotification = async (notificationId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/anomaly-service/${CLIENT.id}/notification-details/${notificationId}`,
    )
    return response.data.data
  } catch (error) {
    return null
  }
}
