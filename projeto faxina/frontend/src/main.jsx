import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Layout from './layout/layout'

import Registro from './pages/Registro'
import Login from './pages/Login'
import Home from './pages/Home'

import { AuthProvider } from './context/AuthContext'
import NotFound from './pages/NotFound'
import RegistrarAgendamento from './pages/RegistrarAgendamento'
import Dashboard from './pages/GestaoAgendamento'

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  // 🔓 PÚBLICAS
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/registro',
    element: <Registro />
  },

  // 📱 LAYOUT PRIVADO (SEM PROTEÇÃO)
  {
    path: '/privateRoute',
    element: <Layout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'cadastrosAgendamentos', element: <RegistrarAgendamento /> },
      { path: 'gestaoAgendamento', element: <Dashboard />},
    
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" transition={Bounce} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)