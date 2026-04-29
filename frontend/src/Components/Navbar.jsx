import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate('/')
    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
      <>

              <nav className="bg-white/3 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-white">🏠 Gestão de Faxinas</h1>
                  
                  {/* Info do Usuário */}
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                      <FaUserCircle className="w-8 h-8 text-slate-300" />
                      <div>
                        <p className="text-sm text-slate-400">Olá,</p>
                        <p className="text-white font-semibold">{user?.nome || 'Usuário'}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-2"
                      title="Sair"
                    >
                      <FaSignOutAlt />
                      <span className="hidden md:inline">Sair</span>
                    </button>
                  </div>
                </div>
              </nav>
      </>
        
    )
}

export default Navbar
