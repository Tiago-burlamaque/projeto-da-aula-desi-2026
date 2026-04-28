import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import Registro from './pages/Registro'
import Login from './pages/Login'
import Home from './pages/Home'

import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
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
    element: <Layout />, // ✅ APENAS LAYOUT!
    children: [
      { path: 'home', element: <Home /> },
      { path: 'faxinas', element: <div>Faxinas</div> },
      { path: 'calendario', element: <div>Calendário</div> },
      { path: 'equipe', element: <div>Equipe</div> },
      { path: 'configuracoes', element: <div>Configurações</div> }
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