// Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ModalEdit from '../Components/ModalEdit';

const Dashboard = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // 🔥 MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/service');
      setAgendamentos(res.data.data || []);
    } catch (error) {
      toast.error('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();

  // 🔥 ABRIR MODAL DE EDIÇÃO
  const openEditModal = (id) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  // 🔥 FECHAR MODAL
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // 🔥 SUCESSO - Recarrega lista
  const handleSuccess = () => {
    fetchData();
    closeModal();
  };

  const handleDelete = async (id) => {
    if (confirm(`Excluir agendamento #${id}?`)) {
      try {
        await axios.delete(`http://localhost:3000/service/${id}`);
        toast.success('🗑️ Agendamento excluído!');
        fetchData();
      } catch (error) {
        toast.error('❌ Erro ao excluir');
      }
    }
  };

  const filtered = agendamentos.filter(item =>
    item.nome?.toLowerCase().includes(search.toLowerCase()) ||
    item.nome_servico?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-white text-center py-20">Carregando...</div>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black text-white mb-4">Gestão de Faxinas</h1>
            <p className="text-2xl text-slate-400">{agendamentos.length} agendamentos</p>
          </div>

          {/* Busca + Novo */}
          <div className="mb-8">
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Buscar por nome ou serviço..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-slate-400 transition-all"
                />
              </div>
              <button 
                className="px-8 py-4 bg-emerald-600/90 border border-emerald-500/50 rounded-2xl text-white font-semibold hover:bg-emerald-700 shadow-lg transition-all" 
                onClick={() => {
                  setEditingId(null); // Novo
                  setIsModalOpen(true);
                }}
              >
                + Novo
              </button>
            </div>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(agendamento => (
              <div key={agendamento.id} className="group bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/5 hover:border-white/20 hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex-1 line-clamp-1">{agendamento.nome_servico}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    agendamento.status === 'pendente' ? 'bg-yellow-500/20 text-yellow-300' :
                    agendamento.status === 'confirmado' ? 'bg-emerald-500/20 text-emerald-300' :
                    agendamento.status === 'cancelado' ? 'bg-red-500/20 text-red-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {agendamento.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-slate-300 font-medium">{agendamento.nome}</p>
                  <p className="text-slate-400 text-sm">{agendamento.cidade}</p>
                  <p className="text-xs text-slate-500">
                    📅 {new Date(agendamento.agendamento_servico).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-emerald-400 font-bold text-lg">
                    💰 R$ {parseFloat(agendamento.valor_servico || 0).toFixed(2)}
                  </p>
                </div>

                {/* 🔥 BOTÕES EDIT/DELETE */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => openEditModal(agendamento.id)}
                    className="flex-1 p-3 bg-gradient-to-r from-blue-600/90 to-blue-700 hover:from-blue-700 hover:to-blue-800 border border-blue-500/50 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105"
                    title="Editar"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(agendamento.id)}
                    className="flex-1 p-3 bg-gradient-to-r from-red-600/90 to-red-700 hover:from-red-700 hover:to-red-800 border border-red-500/50 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105"
                    title="Excluir"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 bg-white/3 rounded-2xl border border-white/10 mt-12">
              <div className="text-6xl mb-6 opacity-40">📭</div>
              <h3 className="text-3xl font-bold text-slate-300 mb-4">Nenhum agendamento encontrado</h3>
              <p className="text-slate-500 mb-8">Crie o primeiro agendamento!</p>
              <button 
                onClick={() => {
                  setEditingId(null);
                  setIsModalOpen(true);
                }}
                className="px-12 py-4 bg-emerald-600/90 border border-emerald-500/50 rounded-2xl text-white font-bold hover:bg-emerald-700 shadow-lg transition-all"
              >
                + Novo Agendamento
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 MODAL AGENDAMENTO FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl border h-100 border-white/20 rounded-3xl shadow-2xl p-0">
              <ModalEdit 
                editingId={editingId}
                onClose={closeModal}
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;