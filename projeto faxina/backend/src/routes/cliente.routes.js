import { Router } from 'express'
import { createUser, getUser, getUserNameById, loginUser } from '../controller/cliente.controller.js'

const clienteRouter = Router()

clienteRouter.get('/', getUser)
clienteRouter.get('/:id', getUserNameById)
clienteRouter.post('/registro', createUser)
clienteRouter.post('/login', loginUser)

export default clienteRouter;