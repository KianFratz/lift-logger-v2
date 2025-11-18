import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { EmptyInputGroup } from './components/EmptyInputGroup'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<EmptyInputGroup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
