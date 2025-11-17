import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import { EmptyInputGroup } from './components/EmptyInputGroup.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/login", element: <Login /> },
  { path: "*", element: <EmptyInputGroup />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
