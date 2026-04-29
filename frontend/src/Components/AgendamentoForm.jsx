import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes, FaSave } from 'react-icons/fa';

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

  useEffect(() => {
    if (editingId) {
      // Carregar dados para edição
      axios.get(`http://localhost:3000/service/${editingId}`).then(res => {
        setFormData(res.data.data);
      });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.success('Agendamento atualizado!');
      } else {
        await axios.post('http://localhost:3000/service', payload);
        toast.success('Agendamento criado!');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro');
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
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
          <FaTimes className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome *" required 
               className="input-neutral" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" required 
               className="input-neutral" />
        <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone *" required 
               className="input-neutral" maxLength="15" />
        <input type="datetime-local" name="dataHora" value={formData.dataHora} onChange={handleChange} required 
               className="input-neutral" />
        <input name="nomeServico" value={formData.nomeServico} onChange={handleChange} placeholder="Serviço *" required 
               className="input-neutral" />
        <input name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade *" required 
               className="input-neutral" />
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <select name="status" value={formData.status} onChange={handleChange} className="input-neutral">
            <option value="pendente">Pendente</option>
            <option value="confirmado">Confirmado</option>
            <option value="cancelado">Cancelado</option>
            <option value="concluido">Concluído</option>
          </select>
          <input type="number" name="valor" value={formData.valor} onChange={handleChange} placeholder="Valor R$" required 
                 className="input-neutral" step="0.01" min="0" />
        </div>
      </form>

      <div className="flex gap-4 pt-4">
        <button type="button" onClick={onClose} 
                className="flex-1 py-3 px-6 border border-white/20 rounded-xl text-slate-300 hover:bg-white/10 transition-all">
          Cancelar
        </button>
        <button type="submit" disabled={loading} 
                className="flex-1 py-3 px-6 bg-emerald-600/90 border border-emerald-500/50 rounded-xl text-white font-semibold hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50">
          <FaSave className="inline mr-2" />
          {loading ? 'Salvando...' : editingId ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </div>
  );
};

export default AgendamentoForm;