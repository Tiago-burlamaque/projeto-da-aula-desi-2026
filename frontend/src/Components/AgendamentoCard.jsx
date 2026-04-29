import React from 'react';
import { FaEdit, FaTrash, FaCalendarCheck } from 'react-icons/fa';

const AgendamentoCard = ({ agendamento, onEdit, onDelete, onRefresh }) => {
  const statusColors = {
    pendente: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
    confirmado: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    cancelado: 'bg-red-500/20 border-red-500/30 text-red-300',
    concluido: 'bg-blue-500/20 border-blue-500/30 text-blue-300'
  };

  const formatData = (data) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="group bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/5 hover:border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Info Principal */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-gray-800 rounded-xl flex items-center justify-center border-2 border-white/20">
                <FaCalendarCheck className="w-8 h-8 text-slate-300" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{agendamento.nome_servico}</h3>
              <p className="text-slate-400 text-lg mb-1">{agendamento.nome}</p>
              <p className="text-slate-500">{agendamento.cidade}</p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
            <div className="flex items-center gap-2 text-slate-400">
              <FaCalendarCheck />
              {formatData(agendamento.agendamento_servico)}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              📧 {agendamento.email}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              📱 {agendamento.telefone}
            </div>
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              💰 R$ {parseFloat(agendamento.valor_servico).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={`px-6 py-3 rounded-xl border-2 font-semibold text-lg ${statusColors[agendamento.status] || 'bg-gray-500/20 border-gray-500/30 text-gray-300'}`}>
          {agendamento.status?.replace(/^\w/, c => c.toUpperCase())}
        </div>

        {/* Ações */}
        <div className="flex gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-all">
          <button 
            onClick={() => onEdit(agendamento)}
            className="p-3 bg-blue-600/80 border border-blue-500/50 rounded-xl text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
            title="Editar"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => onDelete(agendamento.idfuncionario)}
            className="p-3 bg-red-600/80 border border-red-500/50 rounded-xl text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2"
            title="Excluir"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoCard;