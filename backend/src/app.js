import express from 'express'
import cors from 'cors'
import clienteRouter from './routes/cliente.routes.js'
import serviceRouter from './routes/service.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/cliente', clienteRouter)
app.use('/service', serviceRouter);  // Monta em /service
export default app;