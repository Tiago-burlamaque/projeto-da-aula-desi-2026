import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes, FaSave, FaExclamationTriangle } from 'react-icons/fa';

const AgendamentoForm = ({ editingId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataHora: '',
    nomeServico: '',
    cidade: '',
    valor: '',
    status: 'pendente'
  });
  const [loading, setLoading] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (editingId) {
      axios.get(`http://localhost:3000/service/${editingId}`).then(res => {
        const data = res.data.data;
        setFormData({
          nome: data.nome || '',
          email: data.email || '',
          telefone: data.telefone || '',
          dataHora: data.agendamento_servico ? new Date(data.agendamento_servico).toISOString().slice(0, 16) : '',
          nomeServico: data.nome_servico || '',
          cidade: data.cidade || '',
          valor: data.valor_servico || '',
          status: data.status || 'pendente'
        });
        setDuplicateError('');
      });
    } else {
      // Novo agendamento - limpa form
      setFormData({
        nome: '', email: '', telefone: '', dataHora: '',
        nomeServico: '', cidade: '', valor: '', status: 'pendente'
      });
      setDuplicateError('');
    }
  }, [editingId]);

  const formatTelefone = (value) => value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{4})$/, '$1')
    .slice(0, 15);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      setFormData(prev => ({ ...prev, [name]: formatTelefone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Limpa erro de duplicata ao digitar
    if (name === 'dataHora') {
      setDuplicateError('');
    }
  };

  // 🔥 VALIDAÇÃO DUPLICADA DATA/HORA
  const validateDuplicate = async () => {
    const { dataHora } = formData;
    
    if (!dataHora) return true;

    try {
      setIsValidating(true);
      
      // Busca TODOS agendamentos
      const res = await axios.get('http://localhost:3000/service');
      const duplicados = res.data.data.filter(item => 
        new Date(item.agendamento_servico).toISOString().slice(0, 16) === dataHora &&
        (!editingId || item.id != editingId) // Ignora o atual se editando
      );

      console.log('🔍 Duplicados encontrados:', duplicados);

      if (duplicados.length > 0) {
        const conflitos = duplicados.map(d => 
          `• ${d.nome} - ${new Date(d.agendamento_servico).toLocaleString('pt-BR')} (${d.nome_servico})`
        ).join('\n');
        
        setDuplicateError(
          `⚠️ Conflito de horário!\nJá existe agendamento para ${new Date(dataHora).toLocaleString('pt-BR')}:\n${conflitos}`
        );
        return false;
      }

      setDuplicateError('');
      return true;

    } catch (error) {
      console.error('Erro validação duplicata:', error);
      toast.warning('Aviso de horário não pôde ser verificado');
      return true; // Permite salvar se API falhar
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDAÇÃO DUPLICATA ANTES DE SALVAR
    const isValid = await validateDuplicate();
    if (!isValid) {
      toast.error('❌ Não é possível salvar: Conflito de horário!');
      return;
    }

    setLoading(true);

    const payload = {
      nome: formData.nome.trim(),
      email: formData.email.trim().toLowerCase(),
      telefone: formData.telefone.replace(/\D/g, ''),
      cidade: formData.cidade.trim(),
      agendamento_servico: formData.dataHora,
      nome_servico: formData.nomeServico.trim(),
      valor_servico: parseFloat(formData.valor) || 0,
      status: formData.status
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/service/${editingId}`, payload);
        toast.success('✅ Agendamento atualizado!');
      } else {
        await axios.post('http://localhost:3000/service', payload);
        toast.success('✅ Agendamento criado!');
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro salvar:', error.response?.data);
      toast.error(error.response?.data?.message || 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          {editingId ? 'Editar' : 'Novo'} Agendamento
        </h2>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-white/10 rounded-xl transition-all hover:scale-110"
          disabled={loading}
        >
          <FaTimes className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* 🔥 ALERTA VISUAL DE DUPLICATA */}
      {duplicateError && (
        <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-l-4 border-yellow-500 rounded-xl animate-pulse">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-100 leading-relaxed whitespace-pre-line">
              {duplicateError}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Nome *</label>
          <input 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            placeholder="Nome completo" 
            required 
            disabled={loading}
            className="input-neutral" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Email *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="email@exemplo.com" 
            required 
            disabled={loading}
            className="input-neutral" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Telefone *</label>
          <input 
            type="tel" 
            name="telefone" 
            value={formData.telefone} 
            onChange={handleChange} 
            placeholder="(11) 99999-9999" 
            required 
            disabled={loading}
            className="input-neutral" 
            maxLength="15" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Data/Hora <span className="text-yellow-400">*</span>
          </label>
          <input 
            type="datetime-local" 
            name="dataHora" 
            value={formData.dataHora} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="input-neutral focus:ring-yellow-500/50" 
          />
          {isValidating && (
            <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              Verificando conflitos...
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Serviço *</label>
          <input 
            name="nomeServico" 
            value={formData.nomeServico} 
            onChange={handleChange} 
            placeholder="Faxina residencial" 
            required 
            disabled={loading}
            className="input-neutral" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Cidade *</label>
          <input 
            name="cidade" 
            value={formData.cidade} 
            onChange={handleChange} 
            placeholder="São Paulo, SP" 
            required 
            disabled={loading}
            className="input-neutral" 
          />
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              disabled={loading}
              className="input-neutral h-full"
            >
              <option value="pendente">⏳ Pendente</option>
              <option value="confirmado">✅ Confirmado</option>
              <option value="cancelado">❌ Cancelado</option>
              <option value="concluido">🎉 Concluído</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Valor (R$)</label>
            <input 
              type="number" 
              name="valor" 
              value={formData.valor} 
              onChange={handleChange} 
              placeholder="150.00" 
              required 
              disabled={loading}
              className="input-neutral" 
              step="0.01" 
              min="0" 
            />
          </div>
        </div>
      </form>

      <div className="flex gap-4 pt-4">
        <button 
          type="button" 
          onClick={onClose} 
          disabled={loading || isValidating}
          className="flex-1 py-3 px-6 border border-white/20 rounded-xl text-slate-300 hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading || isValidating || !!duplicateError}
          className="flex-1 py-3 px-6 bg-emerald-600/90 border border-emerald-500/50 rounded-xl text-white font-semibold hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {editingId ? 'Atualizando...' : 'Criando...'}
            </>
          ) : (
            <>
              <FaSave className="w-5 h-5" />
              {editingId ? 'Atualizar' : 'Criar Agendamento'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AgendamentoForm;