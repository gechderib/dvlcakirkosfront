import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Comment from './pages/Comment'
import NewsPage from './pages/NewsPage'
import ServicePage from './pages/ServicePage'
import RulesAndHelp from './pages/RulesAndHelp'

function App() {

  return (<BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/comment" element={<Comment/>} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/news" element={<NewsPage />} />
      <Route exact path="/service" element={<ServicePage />} />
      <Route exact path="/help" element={<RulesAndHelp />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
