import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:3000/cliente/login',
                { email, senha }
            );

            // ✅ Salva token
            localStorage.setItem('token', res.data.token);
            
            // ✅ BONUS: Salva dados do usuário também (se backend retornar)
            if (res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }

            toast.success('Login realizado!');
            navigate('/privateRoute/home');
        } catch (error) {
            console.log(error.response?.data);
            toast.error('Erro no login');
        }
    };

    return (
        <section className="h-screen w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Bem-vindo</h1>
                    <p className="text-slate-600 text-sm md:text-base">Entre em sua conta</p>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all backdrop-blur-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all backdrop-blur-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full mt-6 px-4 py-3 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        Entrar
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-white/30"></div>
                    <span className="px-3 text-sm text-slate-600">ou</span>
                    <div className="flex-1 border-t border-white/30"></div>
                </div>

                <p className="text-center text-sm text-slate-700">
                    Não tem conta?{' '}
                    <Link to="/registro" className="font-semibold text-slate-900 hover:underline">
                        Cadastre-se aqui
                    </Link>
                </p>
            </div>

            <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-slate-300/20 to-slate-200/10 rounded-full blur-3xl -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-slate-300/20 to-slate-200/10 rounded-full blur-3xl -z-10"></div>
        </section>
    );
}