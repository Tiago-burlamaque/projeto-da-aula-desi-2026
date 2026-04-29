import axios from 'axios';
import React, { useState } from 'react';
import { FaCalendarAlt,
        FaCity,
        FaUser
 } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { TfiMoney } from "react-icons/tfi";

const RegistrarAgendamento = () => {
  const [formData, setFormData] = useState({
    dataHora: '',
    status: 'pendente',
    nome: '',
    valor: ''
  });

  const statusOptions = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'confirmado', label: 'Confirmado' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'concluido', label: 'Concluído' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/service', {
            formData
        })
    } catch (error) {
        
    }
 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card Principal com Glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20 hover:shadow-3xl transition-all duration-500">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Novo Agendamento</h1>
            <p className="text-slate-300 text-sm">Preencha os dados do agendamento</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Data e Hora */}
            <div className=" gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2 flex gap-2 items-center">
                  <FaCalendarAlt /> Data
                </label>
                <input
                  type="datetime-local"
                  name="data"
                  value={formData.dataHora}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 hover:bg-white/20"
                />
              </div>
              
             
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex gap-2 items-center">
                <FaUser /> Nome do funcionario
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome completo"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 hover:bg-white/20"
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex gap-2 items-center">
                <FaCity /> Cidade
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome completo"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 hover:bg-white/20"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex gap-2 items-center">
                <SiSimpleanalytics /> Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 hover:bg-white/20 appearance-none cursor-pointer"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex gap-2 items-center">
                <TfiMoney /> Valor (R$)
              </label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                placeholder="0,00"
                step="0.01"
                min="0"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 hover:bg-white/20"
              />
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 rounded-2xl font-semibold text-white text-lg backdrop-blur-sm hover:from-white/30 hover:to-white/20 hover:shadow-2xl hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
               Cadastrar Agendamento
            </button>
          </form>

          {/* Info adicional */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Campos obrigatórios *
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarAgendamento;