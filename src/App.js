import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Header from './components/header/header.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Metrics from './pages/metrics/metrics.js'
import Dashboard from './pages/dashboard/dashboard.js'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/metrics/:notificationId" element={<Metrics />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
