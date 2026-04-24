import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors)

app.get('/teste', (req, res) => {
    res.send("Teste")
})

export default app;