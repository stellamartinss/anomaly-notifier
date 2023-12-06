import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const markReadNotification = async (notificationId) => {
  try {
    const markAsRead = await axios.post(
      `${BASE_URL}/anomaly-service/${notificationId}/mark-read`,
    )

    return markAsRead.data.success
  } catch (error) {
    console.error(`Something went wrong: ${error}`)
  }
}

export const markReadAllNotifications = async () => {
  try {
    const markAsRead = await axios.post(
      `${BASE_URL}/anomaly-service/mark-all-read`,
    )
    
    return markAsRead.data.success
  } catch (error) {
    return null
  }
}

export const getNotification = async (notificationId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/anomaly-service/${notificationId}`,
    )
    return response.data.data
  } catch (error) {
    return null
  }
}
