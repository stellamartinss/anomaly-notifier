const jsonServer = require('json-server')
const cors = require('cors')

const server = jsonServer.create()

server.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'X-Custom-Header'],
  }),
)
server.options('*', cors())

const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()

const PORT = 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/api/anomaly-service/:orgId', (req, res) => {
  const { orgId } = req.params

  const allNotifications = router.db.get('anomaly-service').value()

  res.json({ data: allNotifications.filter((item) => item.orgId === +orgId && !item.read) })
})

server.get('/api/anomaly-service/:orgId/unread', (req, res) => {
  try {
    const { orgId } = req.params
    const db = router.db
    const anomalyService = db.get('anomaly-service').value()

    const updatedAnomalyService = anomalyService.map((item) => {
      if (item.orgId.toString() === orgId) {
        return { ...item, read: false }
      }
      return item
    })

    db.set(
      'anomaly-service',
      updatedAnomalyService.filter((item) => !!item.read),
    ).write()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json(error)
  }
})

server.post('/api/anomaly-service/:orgId/mark-read', (req, res) => {
  try {
    const { orgId } = req.params
    const { messageIds } = req.query

    const db = router.db
    const anomalyService = db.get('anomaly-service').value()
    let updatedAnomalyService = []

    if (!messageIds) {
      updatedAnomalyService = anomalyService.map((item) => {
        if (item.orgId.toString() === orgId) {
          return { ...item, read: true }
        }

        return item
      })
    } else {
      updatedAnomalyService = anomalyService.map((item) => {
        const ids = JSON.parse(messageIds)

        if (
          item.orgId.toString() === orgId &&
          ids.some((id) => id === item.id)
        ) {
          return { ...item, read: true }
        }

        return item
      })
    }

    db.set('anomaly-service', updatedAnomalyService).write()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json(error)
  }
})

server.get(
  '/api/anomaly-service/:orgId/notification-details/:notificationId',
  (req, res) => {
    try {
      const { orgId, notificationId } = req.params
      const db = router.db
      const anomalyService = db.get('anomaly-service').value()

      const updatedAnomalyService = anomalyService.find((item) => {
        return item.orgId.toString() === orgId && item.id === +notificationId
      })

      res.json({ data: updatedAnomalyService })
    } catch (error) {
      res.status(500).json(error)
    }
  },
)

server.use('/', router)

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
