import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import Login from './components/Login.jsx'
import Medicamentos from './components/Medicamentos.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/medicamento", element: <Medicamentos /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
)
