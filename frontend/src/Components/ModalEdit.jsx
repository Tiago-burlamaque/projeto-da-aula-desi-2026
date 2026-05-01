import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes, FaSave, FaEdit, FaExclamationTriangle, FaPhone, FaMapMarkerAlt, FaTag } from 'react-icons/fa';

const ModalEdit = ({ 
  isOpen, 
  onClose, 
  formData, 
  setFormData, 
  onSave,
  editingId
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatTelefone = (value) => 
    value.replace(/\D/g, '')
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
    setDuplicateError('');
  };

  // 🔥 VALIDAÇÃO DUPLICATA
  const validateDuplicate = async () => {
    const { agendamento_servico } = formData;
    if (!agendamento_servico) return true;

    try {
      setIsValidating(true);
      const res = await axios.get('http://localhost:3000/service');
      const duplicados = res.data.data.filter(item => 
        new Date(item.agendamento_servico).toISOString().slice(0, 16) === 
        new Date(agendamento_servico).toISOString().slice(0, 16) &&
        item.id != editingId
      );

      if (duplicados.length > 0) {
        setDuplicateError(
          `⚠️ Conflito!\n${duplicados.map(d => `• ${d.nome} (${d.nome_servico})`).join('\n')}`
        );
        return false;
      }
      setDuplicateError('');
      return true;
    } catch (error) {
      return true;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isValid = await validateDuplicate();
    if (!isValid) return toast.error('❌ Conflito de horário!');

    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      toast.error('Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 p-4 bg-black/70 backdrop-blur-sm flex items-center justify-center ">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
          
          {/* HEADER */}
          <div className="p-8 border-b border-white/10 sticky top-0 bg-slate-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <FaEdit className="w-8 h-8 text-blue-400" />
                  Editar Agendamento #{formData.id}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-2xl transition-all"
                disabled={loading}
              >
                <FaTimes className="w-6 h-6 text-slate-400" />
              </button>
            </div>
          </div>

          {/* ALERTA DUPLICADO */}
          {duplicateError && (
            <div className="mx-8 mt-6 p-5 bg-yellow-500/20 border-l-4 border-yellow-500 rounded-xl">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-100 whitespace-pre-line">
                  {duplicateError}
                </div>
              </div>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSave} className="p-8 space-y-6">
            {/* Linha 1: Nome + Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  👤 Nome *
                </label>
                <input
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  📱 Telefone *
                </label>
                <input
                  name="telefone"
                  type="tel"
                  value={formData.telefone || ''}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Linha 2: Data + Serviço */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  📅 Data/Hora *
                </label>
                <input
                  name="agendamento_servico"
                  type="datetime-local"
                  value={formData.agendamento_servico ? new Date(formData.agendamento_servico).toISOString().slice(0, 16) : ''}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                  required
                />
                {isValidating && (
                  <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                    <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    Verificando...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  🧹 Serviço *
                </label>
                <input
                  name="nome_servico"
                  value={formData.nome_servico || ''}
                  onChange={handleChange}
                  placeholder="Faxina residencial"
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Linha 3: Cidade + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  📍 Cidade *
                </label>
                <input
                  name="cidade"
                  value={formData.cidade || ''}
                  onChange={handleChange}
                  placeholder="São Paulo, SP"
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  ✉️ Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="cliente@email.com"
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            {/* Linha 4: Status + Valor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status || 'pendente'}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  <option value="pendente">⏳ Pendente</option>
                  <option value="confirmado">✅ Confirmado</option>
                  <option value="cancelado">❌ Cancelado</option>
                  <option value="concluido">🎉 Concluído</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  💰 Valor *
                </label>
                <input
                  name="valor_servico"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.valor_servico || ''}
                  onChange={handleChange}
                  placeholder="150.00"
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-emerald-600/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* BOTÕES */}
            <div className="flex gap-4 pt-6 border-t border-white/10 mt-8">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-4 px-6 border border-white/20 rounded-xl text-slate-300 hover:bg-white/10 transition-all font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || isValidating || !!duplicateError}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 border border-emerald-500/50 rounded-xl text-white font-semibold hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FaSave className="w-5 h-5" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;