const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()

const PORT = 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/anomaly-service', (req, res) => {
  const allNotifications = router.db.get('anomaly-service').value()
  res.json({ data: allNotifications })
})

server.get('/anomaly-service/:orgId', (req, res) => {
  res.json({ data: [] })
})

server.get('/anomaly-service/:orgId/unread', (req, res) => {
  res.json({ data: [] })
})

server.post('/anomaly-service/:orgId/mark-read', (req, res) => {
  try {
    const { orgId } = req.params
    const db = router.db
    const anomalyService = db.get('anomaly-service').value()

    const updatedAnomalyService = anomalyService.map((item) => {
      if (item.orgId.toString() === orgId) {
        return { ...item, read: true }
      }
      return item
    })

    db.set('anomaly-service', updatedAnomalyService).write()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: true })
  }
})

server.post('/anomaly-service/:orgId/mark-read', (req, res) => {
  const { messageId } = req.query
  const recordIds = messageId.split(',').map(Number)
  res.json({ success: true })
})

server.use('/api', router)

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
