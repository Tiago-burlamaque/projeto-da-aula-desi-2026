import { Router } from 'express'
import { createUser, getUser, loginUser } from '../controller/cliente.controller.js'

const clienteRouter = Router()

clienteRouter.get('/', getUser)
clienteRouter.post('/registro', createUser)
clienteRouter.post('/login', loginUser)

export default clienteRouter;