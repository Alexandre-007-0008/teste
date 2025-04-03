
"use client";
import { FormEvent } from "react";
import axios from "axios";
import Produto from "@/app/db/models/produto";
import { ProdutoType } from "@/app/types";

export default function Pagina() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const valor = Number(formData.get("valor"));

    if (!name || isNaN(valor) || valor <= 0) {
      alert("Preencha todos os campos corretamente");
      return;
    }

   
      const response = await axios.post("/api/v1/produtos", { name, valor });
      alert("Produto cadastrado com sucesso!");
      console.log("✅ Resposta do backend:", response.data);

      // event.currentTarget.reset(); // Limpa o formulário
   
  }
// placeholder="Valor (R$)"
  return (
    <>
      <div className="container">
      <h2 className="text-center">Cadastro de Produto</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Nome do Produto</label>
          <input type="text" 
          name="name" 
          placeholder="Nome do Produto" 
          className="form-control"
          required />
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor (R$)</label>
          <input
            type="number"
            name="valor"
            id="valor"
            placeholder="Valor (R$)"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Cadastrar Produto
        </button>
      </form>
    </div>

    {/* <div className="produto-central">
      {Produto.map((p: ProdutoType) => (
        <div key={p._id} className="produto-card">
              
         <div className="flex">
          <p className="produto-nome">{p.name}</p>
          <p className="produto-nome">R${p.valor}</p>
         </div>
     </div>
    ))}
   </div> */}
    </>

  );
}

// "use client";
// import { FormEvent } from "react";
// import { useProduct } from "../../Contexts/ProductContext";

// export default function Pagina() {
//   const { cadastrarProduto } = useProduct();  

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();  

//     const formData = new FormData(event.currentTarget);
//     const name = formData.get("name") as string;
//     const valor = Number(formData.get("valor"));

//     if (!name || isNaN(valor) || valor <= 0) {
//       alert("Preencha todos os campos corretamente");  
//       return;
//     }

//     try {
//       await cadastrarProduto(name, valor);  
//       alert("Produto cadastrado com sucesso!");
//       // event.currentTarget.reset();
//     } catch (error) {
//       console.error("Erro ao cadastrar produto:", error);  
//       alert("Erro ao cadastrar produto");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>  
//       <input type="text" name="name" placeholder="name do Produto" required />
//       <input type="number" name="valor" placeholder="Valor (R$)" required />
//       <button type="submit">Cadastrar Produto</button>
//     </form>
//   );
// }




// 'use client'
// import { FormEvent, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useProduct } from '../../Contexts/ProductContext'
// import "../../globals.css"

// export default function Pagina() {
//   const { cadastrarProduto } = useProduct() // Pegando os produtos do contexto
//   const router = useRouter()

//   // Estado para atualizar a tela com os novos produtos
//   const [produtoNome, setProdutoNome] = useState("")
//   const [produtoValor, setProdutoValor] = useState<number | "">("")

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
  
//     if (!produtoNome || produtoValor === "" || Number(produtoValor) <= 0) {
//       alert("Preencha todos os campos corretamente")
//       return
//     }
  
//     try {
//       console.log("🔍 Enviando produto:", { produtoNome, produtoValor })
//       await cadastrarProduto(produtoNome, (produtoValor))
//       alert("Produto cadastrado com sucesso!")

//       // Limpa os inputs
//       setProdutoNome("")
//       setProdutoValor("")

//       // Atualiza a tela após o cadastro (se necessário, pode puxar os produtos do contexto)
//     } catch (error) {
//       console.error("Erro ao cadastrar produto:", error)
//       alert("Erro ao cadastrar produto")
//     }
//   }

//   return (
//     <div className="container">
//       <h2 className="text-center">Cadastro de Produto</h2>

//       <form onSubmit={handleSubmit} className="form-container">
//         <div className="form-group">
//           <label htmlFor="name">Nome do Produto</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             autoComplete="additional-name"
//             className="form-control"
//             value={produtoNome}
//             onChange={(e) => setProdutoNome(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="valor">Valor (R$)</label>
//           <input
//             type="number"
//             name="valor"
//             id="valor"
//             autoComplete="additional-name"
//             className="form-control"
//             value={produtoValor}
//             onChange={(e) => setProdutoValor(e.target.value ? Number(e.target.value) : "")}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100 mt-3">
//           Cadastrar Produto
//         </button>
//       </form>

      
//     </div>
//   )
// }
