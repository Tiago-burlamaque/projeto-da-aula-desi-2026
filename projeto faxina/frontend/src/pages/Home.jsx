import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import {
  FaSignOutAlt, FaPlus, FaList, FaChartBar, FaUserCircle,
  FaCalendarAlt, FaMoneyBillWave, FaClock
} from 'react-icons/fa';

// ✅ Função para decodificar JWT (SEM biblioteca!)
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pendente: 0,
    confirmado: 0,
    valorTotal: 0
  });

  // ✅ Pega usuário do token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    // Decodifica o token para pegar dados do usuário
    const decoded = decodeToken(token);

    if (decoded) {
      setUser(decoded);
    } else {
      // Token inválido
      localStorage.removeItem('token');
      navigate('/');
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:3000/service');
      const data = res.data.data || [];

      setStats({
        total: data.length,
        pendente: data.filter(a => a.status === 'pendente').length,
        confirmado: data.filter(a => a.status === 'confirmado').length,
        valorTotal: data.reduce((sum, a) => sum + parseFloat(a.valor_servico || 0), 0)
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">


      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Saudação Personalizada */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 mb-6">
            <FaUserCircle className="w-12 h-12 text-slate-300" />
            <div className="text-left">
              <p className="text-slate-400 text-sm">{getSaudacao()},</p>
              <h2 className="text-2xl font-bold text-white">
                {user?.nome || 'Usuário'}! 👋
              </h2>
            </div>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-2xl">
            Dashboard
          </h1>
          <p className="text-xl text-slate-400">
            Gerencie seus agendamentos de forma simples
          </p>
        </div>

        {/* Cards Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
              <FaList className="w-7 h-7 text-blue-300" />
            </div>
            <h3 className="text-4xl font-black text-white mb-1">{stats.total}</h3>
            <p className="text-slate-400">Total</p>
          </div>

          <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
              <FaClock className="w-7 h-7 text-yellow-300" />
            </div>
            <h3 className="text-4xl font-black text-yellow-400 mb-1">{stats.pendente}</h3>
            <p className="text-slate-400">Pendentes</p>
          </div>

          <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
              <FaCalendarAlt className="w-7 h-7 text-emerald-300" />
            </div>
            <h3 className="text-4xl font-black text-emerald-400 mb-1">{stats.confirmado}</h3>
            <p className="text-slate-400">Confirmados</p>
          </div>

          <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
              <FaMoneyBillWave className="w-7 h-7 text-purple-300" />
            </div>
            <h3 className="text-3xl font-black text-purple-400 mb-1">
              R$ {stats.valorTotal.toFixed(2)}
            </h3>
            <p className="text-slate-400">Receita Total</p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
             Ações Rápidas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Novo Agendamento */}
            <button
              onClick={() => navigate('/privateRoute/cadastrosAgendamentos')}
              className="bg-gradient-to-br from-emerald-500/10 to-emerald-700/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 hover:from-emerald-500/20 hover:to-emerald-700/20 hover:border-emerald-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group text-left"
            >
              <div className="w-16 h-16 bg-emerald-500/30 border border-emerald-500/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <FaPlus className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Novo Agendamento</h3>
              <p className="text-slate-400">Cadastre um novo serviço</p>
            </button>

            {/* Ver Todos */}
            <button
              onClick={() => navigate('/privateRoute/gestaoAgendamento')}
              className="bg-gradient-to-br from-blue-500/10 to-blue-700/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 hover:from-blue-500/20 hover:to-blue-700/20 hover:border-blue-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group text-left"
            >
              <div className="w-16 h-16 bg-blue-500/30 border border-blue-500/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <FaList className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Gerenciar</h3>
              <p className="text-slate-400">Ver todos os agendamentos</p>
            </button>

       
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-slate-500 text-sm">
            Logado como <span className="text-slate-300 font-semibold">{user?.email}</span>
          </p>
          <p className="text-xs text-slate-600 mt-2">
            © 2024 Gestão de Faxinas
          </p>
        </div>
      </div>
    </div>
  );
}