import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth'
import { EmptyInputGroup } from './components/EmptyInputGroup'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<EmptyInputGroup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
