import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const fazerLogin = async (e) => {

        e.preventDefault();

        setErro("");

        // VALIDAÇÕES
        if (!email || !senha) {
            setErro("Preencha e-mail e senha.");
            return;
        }

        try {

            setLoading(true);
            const res = await axios.post(
                "http://localhost:8081/user/login",
                {
                    email: email,
                    senha: senha
                }
            );

            // SALVA TOKEN
            localStorage.setItem("usuario", JSON.stringify(res.data.usuario))
            localStorage.setItem("token", JSON.stringify(res.data.token))


            toast.success("Login realizado com sucesso!");

            // REDIRECIONA
            navigate("/medicamento");

        } catch (error) {

            console.error(error);

            setErro(
                error.response?.data?.message ||
                "E-mail ou senha inválidos."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f6f9",
                fontFamily: "Arial"
            }}
        >

            <div
                style={{
                    width: "400px",
                    backgroundColor: "#fff",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "#333"
                    }}
                >
                    Login da Farmácia da Professora Ana
                </h1>

                <form
                    onSubmit={fazerLogin}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >

                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        style={{
                            padding: "12px",
                            borderRadius: "5px",
                            border: "1px solid #ccc"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        style={{
                            padding: "12px",
                            borderRadius: "5px",
                            border: "1px solid #ccc"
                        }}
                    />

                    {
                        erro && (

                            <div
                                style={{
                                    backgroundColor: "#ffe5e5",
                                    color: "#d10000",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    fontSize: "14px"
                                }}
                            >
                                {erro}
                            </div>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "12px",
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >

                        {
                            loading
                                ? "Entrando..."
                                : "Entrar"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}