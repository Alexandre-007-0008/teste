
// 'use client'

// import axios from 'axios'
// import { ProdutoType } from './types'
// import { redirect } from 'next/navigation'
// import { useEffect, useState } from 'react'

// import "./globals.css"


// export default function Home() {
//   const [produtos, setProdutos] = useState<ProdutoType[]>([])
//   const [qtde, setQtde] = useState<number>(0)
  

//   const carregarDados = async () => {
//     axios.get<ProdutoType[]>('http://localhost:3000/api/v1/produtos').then((resp) => setProdutos(resp.data))
//     axios.get<{ total: number }[]>('http://localhost:3000/api/v1/relatorios/quantidade').then((resp) => {
//       setQtde(resp.data[0] ? resp.data[0].total : 0)
//     })
//   }

//   useEffect(() => {
//     carregarDados()
//   }, [])

//   const removerProduto = async (_id: number | string) => {
//     await axios.delete(`http://localhost:3000/api/v1/produtos/${_id}`);
//     carregarDados();
//     redirect('/produtos'); // Redireciona para a página de produtos após a remoção
//   };

//   return (
//     <>
//           <div className="top-bar">
//               <div className="logo">Electronic's Place</div>
//               <div className="user-area">
//                   <a  href="/carrinho">
//                       <img className="button-img button-img2"/>
//                   </a>
//                   <a href="/login">
//                       <img className="button-img button-img1"/>
//                   </a>
//               </div>
//           </div>
//           <div className="search-container">
//               <input type="text" placeholder="Pesquisar..."/>
//               {/* <p><strong>Quantidade:</strong>{qtde}</p> */}
//           </div>  
//       <table>
//         <tbody className="lista">
//           {produtos.map((p: ProdutoType, index) =>
//             <tr key={p._id  || index}>
      
//               <td><a href={`/api/v1/produtos/${p._id}`}>{p.name}</a></td>
//               <td>{p.valor}</td>
//               <td><p>Quantidade: {p.qtde}</p></td>
//               <td className="editar-remover">
//                 <p><a className="editar-remover as" href={`/produtos/${p._id}/editar`}>Editar</a></p>
//                 |
//                 <button className="editar-remover button" onClick={() => removerProduto(p._id!)}>Remover</button>
//               </td>
//             </tr>
//             ) 
//           }
//         </tbody>
//       </table>
//     </>
//   )
// }


'use client'

import axios from 'axios'
import { ProdutoType } from './types'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import "./globals.css"

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]) // Estado para armazenar os produtos
  const [qtde, setQtde] = useState<number>(0) // Estado para armazenar a quantidade total de produtos
  const [searchQuery, setSearchQuery] = useState<string>('') // Estado para armazenar a pesquisa
  const [loading, setLoading] = useState<boolean>(false) // Estado para controlar o carregamento
  const [error, setError] = useState<string>('') // Estado para armazenar erros

  // Função para carregar os dados dos produtos e quantidade total
  const carregarDados = async () => {
    setLoading(true) // Define como carregando antes de fazer a requisição
    try {
      const responseProdutos = await axios.get<ProdutoType[]>('http://localhost:3000/api/v1/produtos')
      setProdutos(responseProdutos.data)

      const responseQuantidade = await axios.get<{ total: number }[]>('http://localhost:3000/api/v1/relatorios/quantidade')
      setQtde(responseQuantidade.data[0] ? responseQuantidade.data[0].total : 0)

    } catch (err) {
      setError('Erro ao carregar os produtos') // Se algo der errado
    } finally {
      setLoading(false) // Finaliza o carregamento
    }
  }

  // Função para filtrar os produtos com base na pesquisa
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query) // Atualiza o estado de pesquisa

    if (query.trim() === '') {
      carregarDados() // Se a pesquisa estiver vazia, carrega todos os produtos
    } else {
      try {
        setLoading(true)
        const response = await axios.get<ProdutoType[]>(`http://localhost:3000/api/v1/produtos/search?name=${query}`)
        setProdutos(response.data) // Atualiza os produtos com o filtro
      } catch (err) {
        setError('Erro ao buscar produtos') // Se algo der errado
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    carregarDados() // Carrega os dados ao montar o componente
  }, [])
  return (
    <>
      <div className="top-bar">
        <div className="logo">Electronic's Place</div>
        <div className="user-area">
          <a href="/carrinho">
            <img className="button-img button-img2" />
          </a>
          <a href="/login">
            <img className="button-img button-img1" />
          </a>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={handleSearch} // Chama a função de pesquisa quando o valor mudar
        />
      </div>

      {loading && <p>Carregando produtos...</p>}
      {error && <p>{error}</p>}

      {/* <table>
        <tbody className="lista">
          {produtos.map((p: ProdutoType, index) =>
            <tr key={p._id || index}>
              <td><a href={`/api/v1/produtos/${p._id}`}>{p.name}</a></td>
              <td>R${p.valor}</td>
              <td><p>Quantidade: {p.qtde}</p></td>
              <td className="editar-remover">
                <p><a className="editar-remover as" href={`/produtos/${p._id}/editar`}>Editar</a></p>
                |
                <button className="editar-remover button" onClick={() => removerProduto(p._id!)}>Remover</button>
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
{/* dilema: a imagem quando pesquisa n aparece ou o contrário */}
        <div className="produto-central">
          {produtos.map((p: ProdutoType, index) => (
             <div key={p.id || index} className="produto-card">
            {/* //   <a href={`/produtos/${p.id}`}>
            //     <img src={p.img || `/imagens/produto${p._id}.png`} alt={p.name} />
            //   </a> */}
              <a href={`/produtos/${p.id}`}><img src={p.img || `/imagens/produto${p.id}.png`} alt={p.name}/></a>
              <div className="flex">
                <p className="produto-nome">{p.name}</p>
                <p className="produto-nome">R${p.valor}</p>
              </div>
             
            </div>
          ))}
        </div>

      <div className="bottom-bar">
        <div className="espaço">
          <a href="/fale-conosco">Fale conosco!</a>
          <a href="/fale-conosco">Divulgue sua marca no nosso site!</a>
        </div>
      </div>
    </>
  )
}
