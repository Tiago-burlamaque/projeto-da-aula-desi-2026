
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaCalendarAlt, FaEnvelope, FaPhone, FaUser, FaMapMarkerAlt, FaSave
} from 'react-icons/fa';
import { SiSimpleanalytics } from 'react-icons/si';
import { TfiMoney } from 'react-icons/tfi';
import { useNavigate } from 'react-router';

const RegistrarAgendamento = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  // Máscara telefone BR
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
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      await axios.post('http://localhost:3000/service', payload);
      toast.success('Serviço agendado com sucesso!');

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        dataHora: '',
        nomeServico: '',
        cidade: '',
        valor: '',
        status: 'pendente'
      });
      navigate('/privateRoute/gestaoAgendamento');
    } catch (error) {
      console.error('Erro:', error.response?.data);
      toast.error(error.response?.data?.message || 'Erro no servidor');
    } finally {
      setIsLoading(false);
    }
  };

  // Componente de Input reutilizável
  const InputField = ({ icon: Icon, label, type = 'text', name, placeholder, ...props }) => (
    <div>
      <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
        <Icon className="text-slate-400 text-xl" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/40 hover:shadow-black/60 transition-all duration-500">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-xl">
              <FaCalendarAlt className="w-10 h-10 text-slate-200" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 drop-shadow-lg">
              Agendar Serviço
            </h1>
            <p className="text-lg text-slate-400">Preencha os dados para criar um novo agendamento</p>
          </div>

          {/* FORM ÚNICO COM TUDO DENTRO */}
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Grid de Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Nome */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <FaUser className="text-slate-400 text-xl" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Digite o nome completo"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <FaEnvelope className="text-slate-400 text-xl" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <FaPhone className="text-slate-400 text-xl" />
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999"
                  maxLength="15"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Data/Hora */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <FaCalendarAlt className="text-slate-400 text-xl" />
                  Data e Hora *
                </label>
                <input
                  type="datetime-local"
                  name="dataHora"
                  value={formData.dataHora}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Serviço */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <SiSimpleanalytics className="text-slate-400 text-xl" />
                  Nome do Serviço *
                </label>
                <input
                  type="text"
                  name="nomeServico"
                  value={formData.nomeServico}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Faxina completa"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-slate-400 text-xl" />
                  Cidade *
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                  placeholder="São Paulo, RJ, etc"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <SiSimpleanalytics className="text-slate-400 text-xl" />
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer appearance-none"
                >
                  <option value="pendente" className="bg-slate-800">🟡 Pendente</option>
                  <option value="confirmado" className="bg-slate-800">🟢 Confirmado</option>
                  <option value="cancelado" className="bg-slate-800">🔴 Cancelado</option>
                  <option value="concluido" className="bg-slate-800">✅ Concluído</option>
                </select>
              </div>

              {/* Valor */}
              <div>
                <label className="block text-lg font-semibold text-slate-200 mb-3 flex items-center gap-3">
                  <TfiMoney className="text-slate-400 text-xl" />
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  required
                  placeholder="50.00"
                  step="0.01"
                                    min="0"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                />
              </div>

            </div>

            {/* BOTÃO SUBMIT - DENTRO DO FORM */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 px-8 bg-gradient-to-r from-slate-700/80 to-slate-600/80 border-2 border-white/20 rounded-2xl text-white text-xl font-bold backdrop-blur-md shadow-2xl hover:from-slate-600/90 hover:to-slate-500/90 hover:border-white/40 hover:shadow-white/10 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <FaSave className="w-5 h-5" />
                    Salvar Agendamento
                  </>
                )}
              </button>
            </div>

            {/* Info */}
            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-slate-500 font-medium">
                Campos com <span className="text-slate-300">*</span> são obrigatórios
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarAgendamento;