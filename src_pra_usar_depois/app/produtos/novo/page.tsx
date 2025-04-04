// 'use client'

// import axios from "axios";
// import { useState } from "react";

// export default function Pagina() {
//     const [formData, setFormData] = useState({ key: "", name: "" })

//     const cadastrarProduto = async (ev: any) => {
//         ev.preventDefault()
//         const produto = await axios.post('http://localhost:27017/app/api/v1/produtos', formData)
//         console.log('Produto cadastrado', produto.data)
//         window.location.href = '/'
//     }

//     const onChange = (event: any) => {
//         setFormData({ ...formData, [event.target.name]: event.target.value });
//     }

//     return (
//         <>
//             <h1>Cadastrar novo produto</h1>

//             <form onSubmit={cadastrarProduto}>
//                 <div>
//                     <label htmlFor='nome'>Nome do produto</label>
//                     <input
//                         id='nome'
//                         name='nome'
//                         type='text'
//                         onChange={onChange}
//                         autoFocus={true}
//                     />

//                     <label htmlFor='valor'>Valor do produto</label>
//                     <input
//                         id='valor'
//                         name='valor'
//                         type='number'
//                     />

//                     <label htmlFor='estoque'>Estoque do produto</label>
//                     <input
//                         id='estoque'
//                         name='estoque'
//                         type='number'
//                     />
//                 </div>

//                 <button>Salvar</button>

//             </form>
//         </>
//     )
// }


'use client'

import axios from "axios";
import { useState } from "react";

export default function Pagina() {
    // Estado para os dados do formulário
    const [formData, setFormData] = useState({
        nome: "",
        valor: 0,
        estoque: 0
    });

    // Função para cadastrar produto
    const cadastrarProduto = async (ev: any) => {
        ev.preventDefault();
        try {
            // Requisição POST para enviar os dados para a API
            const produto = await axios.post('/api/v1/produtos', formData);
            console.log('Produto cadastrado', produto.data);
            window.location.href = '/';  // Redireciona após sucesso
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert("Erro ao cadastrar o produto. Tente novamente.");
        }
    };

    // Função para lidar com as mudanças nos campos do formulário
    const onChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: name === "valor" || name === "estoque" ? Number(value) : value 
        });
    };

    return (
        <>
        <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Novo-Produto</title>
        </head>
        <div className="top-bar">
            <div className="logo">Electronic's Place</div>
            <div className="user-area">
                <a  href="/carrinho">
                    <img className="button-img button-img2"/>
                </a>
                <a href="/login">
                    <img className="button-img button-img1"/>
                </a>
            </div>
          </div>
            <h1>Cadastrar novo produto</h1>

            <form onSubmit={cadastrarProduto}>
                <div>
                    <label htmlFor='nome'>Nome do produto</label>
                    <input
                        id='nome'
                        name='nome'
                        type='text'
                        value={formData.nome}
                        onChange={onChange}
                        autoFocus={true}
                    />
                    <br></br>
                    <label htmlFor='valor'>Valor do produto</label>
                    <input
                        id='valor'
                        name='valor'
                        type='number'
                        value={formData.valor}
                        onChange={onChange}
                    />

                    <label htmlFor='estoque'>Estoque do produto</label>
                    <input
                        id='estoque'
                        name='estoque'
                        type='number'
                        value={formData.estoque}
                        onChange={onChange}
                    />
                </div>

                <button>Salvar</button>
            </form>
        </>
    );
}
