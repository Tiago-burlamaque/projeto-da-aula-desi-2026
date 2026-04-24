import express from 'express'
import cors from 'cors'
import clienteRouter from './routes/cliente.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/cliente', clienteRouter)

export default app;