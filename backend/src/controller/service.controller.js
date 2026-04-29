import db from "../config/db.config.js";

export const createService = async (req, res) => {
    try {
        const { nome, email, telefone, cidade, agendamento_servico, nome_servico, valor_servico, status } = req.body;

        // Validação básica dos campos obrigatórios
        if (!nome || !email || !telefone || !cidade || !agendamento_servico || !nome_servico || !valor_servico) {
            return res.status(400).json({
                success: false,
                message: "Todos os campos são obrigatórios"
            });
        }

        // Query corrigida - faltava o nome da tabela e VALUES estava incompleto
        const [rows] = await db.query(
            `INSERT INTO servicos 
             (nome, email, telefone, cidade, agendamento_servico, nome_servico, valor_servico, status, ativo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
            [nome, email, telefone, cidade, agendamento_servico, nome_servico, valor_servico, status]
        );

        // Retorna ID do serviço criado
        const novoServicoId = rows.insertId;

        res.status(201).json({
            success: true,
            message: "Serviço agendado com sucesso!",
            data: {
                id: novoServicoId,
                nome,
                email,
                telefone,
                cidade,
                agendamento_servico,
                nome_servico,
                valor_servico
            }
        });

    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        
        // Tratamento específico para email duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: "Email já cadastrado no sistema"
            });
        }

        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// ✅ BONUS: Funções adicionais úteis

// Listar todos os serviços
export const getAllServices = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT id, nome, email, telefone, cidade, agendamento_servico, 
                   nome_servico, valor_servico, ativo, created_at 
            FROM servicos 
            WHERE ativo = 1 
            ORDER BY created_at DESC
        `);

        res.json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Erro ao listar serviços:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao listar serviços"
        });
    }
};

// Buscar serviço por ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const [rows] = await db.query(
            `SELECT * FROM servicos WHERE id = ? AND ativo = 1`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Serviço não encontrado"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error("Erro ao buscar serviço:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar serviço"
        });
    }
};

// Atualizar serviço
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, cidade, agendamento_servico, nome_servico, valor_servico } = req.body;

        const [result] = await db.query(
            `UPDATE servicos 
             SET nome = ?, email = ?, telefone = ?, cidade = ?, 
                 agendamento_servico = ?, nome_servico = ?, valor_servico = ?
             WHERE id = ? AND ativo = 1`,
            [nome, email, telefone, cidade, agendamento_servico, nome_servico, valor_servico, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Serviço não encontrado"
            });
        }

        res.json({
            success: true,
            message: "Serviço atualizado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao atualizar serviço:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar serviço"
        });
    }
};

// Deletar serviço (soft delete)
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            `UPDATE servicos SET ativo = 0 WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Serviço não encontrado"
            });
        }

        res.json({
            success: true,
            message: "Serviço cancelado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao deletar serviço:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao cancelar serviço"
        });
    }
};