import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../config/db.config.js';

export const getUser = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT nome, email FROM cliente'
        );

        return res.status(200).json(rows);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao buscar usuários.'
        });
    }
};


export const getUserNameById = async(userId) => {
    try {
        const [rows] = await db.query(
            'SELECT nome FROM usuarios WHERE id = ? LIMIT 1', 
            [userId]
        );
        
        return rows[0]?.nome || null;
    } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
        return null;
    }
}


export const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                message: "Senha deve ter no mínimo 6 caracteres."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await db.query(
            'INSERT INTO cliente (nome, email, senha, ativo) VALUES (?, ?, ?, 1)',
            [nome, email, senhaHash]
        );

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso."
        });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: "Usuário já cadastrado."
            });
        }

        return res.status(500).json({
            message: "Erro interno do servidor."
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                message: 'Email e senha são obrigatórios.'
            });
        }

        const [rows] = await db.query(
            'SELECT idcliente, nome, email, senha, ativo FROM cliente WHERE ativo = 1 AND email = ? LIMIT 1',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Email ou senha inválidos.'
            });
        }

        const usuario = rows[0];

        if (usuario.ativo !== 1) {
            return res.status(403).json({
                message: 'Usuário inativo.'
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                message: 'Email ou senha inválidos.'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso.',
            token,
            usuario: usuario.nome
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro interno do servidor.'
        });
    }
};