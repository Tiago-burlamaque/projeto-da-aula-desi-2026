import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`que nenhuma batalha seja maior que minha força. servidor na porta ${PORT}`);
    
})