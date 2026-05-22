import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Medicamentos() {

    const [medicamentos, setMedicamentos] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("usuario"))


    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [dosagem, setDosagem] = useState('')
    const [marca, setMarca] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [estoqueMinimo, setEstoqueMinimo] = useState('')

    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("usuario")
        localStorage.removeItem("token")
        navigate("/")
    }

    // LISTAR MEDICAMENTOS
    const carregarMedicamentos = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/medicamentos"
            );

            setMedicamentos(response.data);

        } catch (error) {

            console.error("Erro ao carregar dados", error);
        }
    };

    useEffect(() => {
        carregarMedicamentos();
    }, []);


    // SALVAR
    const handleSave = async (e) => {

        e.preventDefault();

        try {

            // NOVO
            if (!editando) {

                const response = await axios.post(
                    "http://localhost:8081/medicamentos", {
                    nome: nome,
                    tipo: tipo,
                    dosagem: dosagem,
                    marca: marca,
                    quantidade: quantidade,
                    estoque_minimo: estoqueMinimo
                });

                alert(response.data.message);

            } else {

                // EDITAR
                const response = await axios.put(
                    `http://localhost:8081/medicamentos/${idEditando}`, {
                    nome: nome,
                    tipo: tipo,
                    dosagem: dosagem,
                    marca: marca,
                    quantidade: quantidade,
                    estoque_minimo: estoqueMinimo
                });

                alert(response.data.message);
            }

            // LIMPA FORM
            setNome("")
            setMarca("")
            setDosagem("")
            setTipo("")
            setQuantidade("")
            setEstoqueMinimo("")

            setEditando(false);
            setIdEditando(null);

            carregarMedicamentos();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Erro ao salvar medicamento."
            );
        }
    };

    // EDITAR
    const editarMedicamento = (medicamento) => {


        setNome(nome)
        setMarca(marca)
        setDosagem(dosagem)
        setTipo(tipo)
        setQuantidade(quantidade)
        setEstoqueMinimo(estoqueMinimo)

        setEditando(true);
        setIdEditando(medicamento.id);
    };

    return (
        <>
            <section className="h-screen  bg-linear-to-br from-neutral-950 via-neutral-500 to-neutral-950 text-white">
                <div className="w-1/2 p-10">
                    <header className="w-full h-50 flex items-center justify-center flex-col gap-10">
                        <h1 className="text-6xl">Seja bem vindo(a) {usuario?.nome}</h1>

                        <h1 className="text-3xl">Sistema de Medicamentos</h1>
                    </header>
                    <div className="w-full items-center justify-center flex">
                        <form onSubmit={handleSave} className="w-150 h-150 bg-linear-to-br from-black via-white to-black opacity-50 rounded flex-col flex">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                id="nome"
                                className="border" />

                            <label htmlFor="tipo">Tipo</label>
                            <input
                                type="text"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                id="tipo"
                                className="border" />

                            <label htmlFor="dosagem">Dosagem</label>
                            <input
                                type="text"
                                value={dosagem}
                                onChange={(e) => setDosagem(e.target.value)}
                                id="dosagem"
                                className="border" />

                            <label htmlFor="marca">Marca</label>
                            <input
                                type="text"
                                value={dosagem}
                                onChange={setDosagem}
                                id="dosagem"
                                className="border" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
// <div
//     style={{

//         fontFamily: "Arial"
//     }}
// >

//     <div
//         style={{
//             width: "100vw",
//             height: "20px"
//         }}>
//         <h1>Seja bem vindo {usuario?.nome}</h1>
//     </div>

//     <h1>
//         Sistema de Medicamentos
//     </h1>

//     <form
//         onSubmit={handleSave}
//         style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             width: "400px",
//             marginBottom: "30px"
//         }}
//     >

//         <input
//             type="text"
//             name="nome"
//             placeholder="Nome"
//             value={nome}
//             onChange={setNome}
//         />

//         <input
//             type="text"
//             name="tipo"
//             placeholder="Tipo"
//             value={tipo}
//             onChange={setTipo}
//         />

//         <input
//             type="text"
//             name="dosagem"
//             placeholder="Dosagem"
//             value={dosagem}
//             onChange={setDosagem}
//         />

//         <input
//             type="text"
//             name="marca"
//             placeholder="Marca"
//             value={marca}
//             onChange={setMarca}
//         />

//         <input
//             type="number"
//             name="quantidade"
//             placeholder="Quantidade"
//             value={quantidade}
//             onChange={setQuantidade}
//         />

//         <input
//             type="number"
//             name="estoque_minimo"
//             placeholder="Estoque mínimo"
//             value={estoqueMinimo}
//             onChange={setEstoqueMinimo}

//         />

//         <button type="submit">

//             {
//                 editando
//                     ? "Atualizar Medicamento"
//                     : "Cadastrar Medicamento"
//             }

//         </button>

//     </form>

//     <table
//         border="1"
//         cellPadding="10"
//         style={{
//             borderCollapse: "collapse",
//             width: "100%"
//         }}
//     >

//         <thead>

//             <tr>
//                 <th>ID</th>
//                 <th>Nome</th>
//                 <th>Tipo</th>
//                 <th>Dosagem</th>
//                 <th>Marca</th>
//                 <th>Quantidade</th>
//                 <th>Estoque Mínimo</th>
//                 <th>Ações</th>
//             </tr>

//         </thead>

//         <tbody>

//             {
//                 medicamentos.map((medicamento) => (

//                     <tr key={medicamento.id}>

//                         <td>{medicamento.id}</td>
//                         <td>{medicamento.nome}</td>
//                         <td>{medicamento.tipo}</td>
//                         <td>{medicamento.dosagem}</td>
//                         <td>{medicamento.marca}</td>
//                         <td>{medicamento.quantidade}</td>
//                         <td>{medicamento.estoque_minimo}</td>

//                         <td>

//                             <button
//                                 onClick={() =>
//                                     editarMedicamento(medicamento)
//                                 }
//                             >
//                                 Editar
//                             </button>

//                         </td>

//                     </tr>
//                 ))
//             }

//         </tbody>

//     </table>

//     {/* <button style={{
//         marginTop: "16px",
//         padding: "5px",
//         fontSize: "20px",
//     }}
//         onClick={handleLogout()}>
//         Logout
//     </button> */}
// </div>
