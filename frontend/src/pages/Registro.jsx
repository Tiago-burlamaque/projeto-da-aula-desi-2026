import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from 'axios'


export default function Registro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            toast.warning('As senhas não coincidem');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:3000/cliente/registro',
                {
                    nome: nome,
                    email: email,
                    senha: senha
                }
            );

            console.log(res.data);
            toast.success('Usuário cadastrado com sucesso');
            navigate('/')

        } catch (error) {
            console.error(error);

            
        }
    };

    return (
        <>
            <section className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4 py-8">
                {/* Glass Card Container */}
                <div className="w-full max-w-md backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            Criar Conta
                        </h1>
                        <p className="text-slate-600 text-sm md:text-base">
                            Preencha os dados abaixo para se cadastrar
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleRegister}>
                        {/* Nome Input */}
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-2">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Seu nome completo"
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                            />
                        </div>



                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full mt-6 px-4 py-3 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            Cadastrar
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-white/30"></div>
                        <span className="px-3 text-sm text-slate-600">ou</span>
                        <div className="flex-1 border-t border-white/30"></div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-700">
                        Já tem conta?{' '}
                        <Link to="/" className="font-semibold text-slate-900 hover:underline transition-colors">
                            Faça login aqui
                        </Link>
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-slate-300/20 to-slate-200/10 rounded-full blur-3xl -z-10"></div>
                <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-slate-300/20 to-slate-200/10 rounded-full blur-3xl -z-10"></div>
            </section>
        </>
    )
}