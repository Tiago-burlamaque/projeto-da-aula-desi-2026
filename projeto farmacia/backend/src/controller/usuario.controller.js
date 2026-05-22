import database from "../config/database.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    try {
        const { nome, cpf, email, senha } = req.body;

        if (!nome || !cpf || !email || !senha) {
            res.json({ message: "Preencha os campos" })
        }


        const salts = 10
        const hashPassword = await bcrypt.hash(senha, salts)

        const [rows] = await database.query(
            `INSERT INTO usuario (nome, cpf, email, senha, ativo)
            VALUES (?, ?, ?, ?, 1)`, [nome, cpf, email, hashPassword]
        )

        res.status(201).json({ message: "Usuário criado com sucesso.", rows })
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor.", error: error })
        console.log(`Erro no servidor. ${error}`)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Buscar usuário
        const [rows] = await database.query('SELECT id, nome, email, senha, ativo from usuario WHERE email = ? AND ativo = 1', [email])

        if (rows.length === 0) {
            return res.send("Nenhum usuário encontrado.")
        }

        const usuario = rows[0]

        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        // Gerar token pelo (tempo definido no .env)
        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_SECRET, // colocar no .env
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.json({message: "Login realizado com sucesso.", 
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        console.log("Erro interno no servidor: ", error)
        return res.status(500).json({message: "Erro no servidor.", error})

    }
}