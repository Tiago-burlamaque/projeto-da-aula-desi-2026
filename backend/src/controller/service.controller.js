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
            `INSERT INTO funcionario 
   (nome, email, telefone, cidade, agendamento_servico, nome_servico, valor_servico, status) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
      SELECT idfuncionario as id, nome, email, telefone, cidade, agendamento_servico, 
             nome_servico, valor_servico, status  -- Removido ativo/created_at inexistentes
      FROM funcionario 
      ORDER BY agendamento_servico DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Buscar serviço por ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT * FROM funcionario WHERE idfuncionario = ?`, // ✅ idfuncionario
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Não encontrado" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// controller/service.controller.js
// controller/service.controller.js - DEBUG MÁXIMO!
export const updateService = async (req, res) => {
  console.log('🚀 === UPDATE INICIADO ===');
  console.log('📦 REQUEST BODY:', JSON.stringify(req.body, null, 2));
  console.log('🔑 REQUEST PARAMS:', req.params);
  
  try {
    const { id } = req.params;
    
    // 🔥 TESTE 1: Verifica se ID existe
    const [exists] = await db.query('SELECT * FROM funcionario WHERE idfuncionario = ?', [id]);
    console.log('🔍 REGISTRO ENCONTRADO:', exists.length > 0 ? 'SIM' : 'NÃO');
    
    if (exists.length === 0) {
      return res.status(404).json({ success: false, message: `ID ${id} não existe` });
    }

    const {
      nome, email, telefone, cidade,
      agendamento_servico, nome_servico,
      valor_servico, status
    } = req.body;

    console.log('📊 VALORES PARA UPDATE:', {
      nome, email, telefone, cidade,
      agendamento_servico, nome_servico,
      valor_servico, status
    });

    // 🔥 TESTE 2: UPDATE SIMPLES (só nome e status primeiro)
    const [result] = await db.query(
      `UPDATE funcionario 
       SET nome = ?, status = ?
       WHERE idfuncionario = ?`,
      [nome || exists[0].nome, status || exists[0].status, id]
    );

    console.log('✅ UPDATE RESULT:', result);

    res.json({ 
      success: true, 
      message: 'Atualizado com sucesso!',
      affectedRows: result.affectedRows 
    });

  } catch (error) {
    console.error('💥 ERRO COMPLETO:');
    console.error('Mensagem:', error.message);
    console.error('SQL State:', error.sqlState);
    console.error('SQL Code:', error.sqlCode);
    console.error('Stack:', error.stack);
    
    res.status(500).json({ 
      success: false, 
      message: `Erro: ${error.message}`,
      debug: process.env.NODE_ENV === 'development' ? error.sqlMessage : undefined
    });
  }
};

// Deletar serviço (soft delete)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🗑️ Deletando funcionario ID: ${id}`);
    
    // ✅ TABELA E COLUNA CORRETAS!
    const [result] = await db.query(
      `DELETE FROM funcionario WHERE idfuncionario = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Funcionário/Agendamento não encontrado" 
      });
    }

    res.json({ 
      success: true, 
      message: `Agendamento removido com sucesso!`,
      deletedId: id,
      affectedRows: result.affectedRows 
    });
    
  } catch (error) {
    console.error('❌ Erro DELETE:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};