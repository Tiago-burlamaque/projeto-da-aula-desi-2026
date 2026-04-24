import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

import { Bounce, ToastContainer } from 'react-toastify'

import Registro from './pages/Registro'
import Login from './pages/Login'
import { Home } from './pages/Home'

import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: 'home',
                element: <Home />
            }
        ]
    },

    {
        path: '/',
        element: <Login />
    },

    {
        path: '/registro',
        element: <Registro />
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <AuthProvider>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="dark"
                transition={Bounce}
            />

            <RouterProvider router={router} />

        </AuthProvider>

    </StrictMode>
)