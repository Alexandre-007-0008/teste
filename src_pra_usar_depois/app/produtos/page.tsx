// 'use client'
// import axios, { AxiosResponse } from 'axios'
// import {useState, useEffect} from 'react'
// import Link from "next/link"

// interface Produto {
//   name: string
//   slug: string
// }

// // const PRODUTOS = [
// //   {
// //     name: 'Resistor',
// //     slug: 'resistor'
// //   },
// //   {
// //     name: 'Multímetro', 
// //     slug: 'multímetro'
// //   }
// // ]

// export default function Dashboard() {
//   const [qtde, setQtde] = useState<number>(0)
//   const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS) // Inicializando com os dados default

//   const carregarDados = async () => {
//     axios.get('http://localhost:27017/api/v1/produtos').then((resp: AxiosResponse) => {setProdutos(resp.data)})
//     axios.get('http://localhost:27017/api/v1/relatorios/quantidade').then((resp: AxiosResponse) => {
//       setQtde(resp.data[0] ? resp.data[0].total : 0)
//     })

//     useEffect(() => {
//       carregarDados() // Carregar os dados quando o componente for montado
//     }, [])
  

//   return (
//     <>
//       <h1>Produtos</h1>

//       <hr/>
//       <p><strong>Qauntidade</strong> {qtde}</p>

//       <ul>
//         {
//           produto.map((produto, index) => (
            
//               <li key={index}>
//                 <Link href={`/produtos/${produto.slug}`}>{produto.name}</Link>
//               </li> 
//            ) )
//       }
//       </ul>
//     </>
//   )
// }


// // Dados iniciais como fallback
// const PRODUTOS: Produto[] = [
//   {
//     name: 'Resistor',
//     slug: 'resistor'
//   },
//   {
//     name: 'Multímetro', 
//     slug: 'multimetro'
//   }
// ]}

// 'use client'
// import axios from 'axios'
// // import axios, {AxiosResponse} from 'axios'
// import { ProdutoType } from '../types'
// // import { redirect } from 'next/navigation'
// import { useState, useEffect } from 'react'
// import { AxiosResponse } from 'axios'

// // import Link from "next/link"

// // interface Produto {
// //   _id: string,
// //   name: string,
// //   slug: string,
// //   valor: number
// // }



// export default function Dashboard() {
//   const [qtde, setQtde] = useState<number>(0)
//   const [produtos, setProdutos] = useState<ProdutoType[]>([]) // Inicializando com os dados default
  

//   const carregarDados = async () => {
//     //Comentei pq tava dando erro no AxiosResponse(Module '"axios"' has no exported member 'AxiosResponse'.)

//     // Carregar dados de produtos da API
//     axios.get('http://localhost:27017/api/v1/produtos')
//       .then((resp: AxiosResponse) => {
//         setProdutos(resp.data) // Atualiza os produtos com os dados da API
//       })

//     // Carregar quantidade de produtos da API
//     axios.get('http://localhost:27017/api/v1/relatorios/quantidade')
//       .then((resp: AxiosResponse) => {
//         setQtde(resp.data[0] ? resp.data[0].total : 0) // Atualiza a quantidade
//       })

//     axios.get<ProdutoType[]>(`http://localhost:3000/api/v1/produtos`).then((resp) => setProdutos(resp.data))
//     axios.get<{ total: number }[]>('http://localhost:3000/api/v1/relatorios/quantidade').then((resp) => {
//       setQtde(resp.data[0] ? resp.data[0].total : 0)
//     })
//   }

//   useEffect(() => {
//     carregarDados() // Carregar os dados quando o componente for montado
//   }, [])
// //implementar o cache pra renderizar mais rápido
//   return (
//     <>
//           <div className="top-bar">
//               <div className="logo"><a href="/">Electronic's Place</a></div>
//               <div className="user-area">
//                   <a  href="/carrinho">
//                       <img className="button-img button-img2"/>
//                   </a>
//                   <a href="/login">
//                       <img className="button-img button-img1"/>
//                   </a>
//               </div>
//           </div>
//           <div className="container">
//             <div className="search-container">
//                 <input type="text" placeholder="Pesquisar..."/>
//             </div>
//             <div className="produto-central">
//               {produtos.map((p: ProdutoType, index) => (
//                 <div key={p._id || index} className="produto-card">
//                   <a href={`/produtos/${p._id}`}>
//                     <img src={p.img || `/imagens/produto${p._id}.png`} alt={p.name} />
//                   </a>
//                   <p className="produto-nome">{p.name}</p>
//                   <p className="produto-nome">R${p.valor}</p>
//                   {/* <p className="produto-valor">R$ {p.valor.toFixed(2)}</p> o valor pode estar indefinido pq o axios tá dando  um erro de network? */}
//                 </div>
//               ))}
//             </div>
//           </div>
//     </> 
//   )
// }





'use client'
import axios from 'axios';
import { ProdutoType } from '../types';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [qtde, setQtde] = useState<number>(0);
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  const carregarDados = async () => {
    // Carregar dados de produtos da API
    axios.get<ProdutoType[]>('http://localhost:3000/api/v1/produtos')
      .then((resp) => {
        setProdutos(resp.data);  // Atualiza os produtos com os dados da API
      });

    // Carregar quantidade de produtos da API
    axios.get<{ total: number }[]>('http://localhost:3000/api/v1/relatorios/quantidade')
      .then((resp) => {
        setQtde(resp.data[0] ? resp.data[0].total : 0);  // Atualiza a quantidade
      });

    // Essa linha abaixo pode ser redundante, mas caso precise:
    // axios.get<ProdutoType[]>('http://localhost:3000/api/v1/produtos')
    //   .then((resp) => setProdutos(resp.data));

    // axios.get<{ total: number }[]>('http://localhost:3000/api/v1/relatorios/quantidade')
    //   .then((resp) => {
    //     setQtde(resp.data[0] ? resp.data[0].total : 0);
    //   });
  };

  useEffect(() => {
    carregarDados(); // Carregar os dados quando o componente for montado
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="logo"><a href="/">Electronic's Place</a></div>
        <div className="user-area">
          <a href="/carrinho">
            <img className="button-img button-img2" />
          </a>
          <a href="/login">
            <img className="button-img button-img1" />
          </a>
        </div>
      </div>
      <div className="container">
        <div className="search-container">
          <input type="text" placeholder="Pesquisar..." />
        </div>
        <div className="produto-central">
          {produtos.map((p: ProdutoType, index) => (
            <div key={p._id || index} className="produto-card">
              <a href={`/produtos/${p._id}`}>
                <img src={p.img || `/imagens/produto${p._id}.png`} alt={p.name} />
              </a>
              <div className="flex">
                <p className="produto-nome">R${p.valor}</p>
                <p className="produto-nome">{p.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-bar">
        <div className="espaço">
          <a href="/fale-conosco">Fale conosco!</a>
          <a href="/fale-conosco">Divulgue sua marca no nosso site!</a>
        </div>
      </div>
    </>
  );
}






{/* <div>
    <div className="central">
    <a href="/produtos/1" aria-label="Produto 1">
        <img src="/imagens/produto1.png" alt="Produto1"/>
    </a>

    <a href="/produtos/2" aria-label="Produto 2">
        <img src="/imagens/produto2.png"  alt="Produto2"/>
    </a>

    <a href="/produtos/3" aria-label="Produto 3">
        <img src="/imagens/produto3.png"  alt="Produto3"/>
    </a>

    <a href="/produtos/4" aria-label="Produto 4">
        <img src="/imagens/produto4.png" alt="Produto 4" />
    </a>

    <a href="/produtos/5" aria-label="Produto 5">
        <img src="/imagens/produto5.png" alt="Produto 5" />
    </a>

    <a href="/produtos/6" aria-label="Produto 6">
        <img src="/imagens/produto6.png" alt="Produto 6" />
    </a>
    </div>
</div> */}

// Dados iniciais como fallback
// const PRODUTOS: Produto[] = [
//   {
//     _id: "",
//     name: 'LED',
//     slug: 'led',
//     valor: 10
//   },
//   {
//     name: 'Multímetro', 
//     slug: 'multimetro'
//   },
//   {
//     name: 'Osciloscópio',
//     slug: 'Osciloscópio'
//   },
//   {
//     name: 'Micro:Bit',
//     slug: 'micro:bit'
//   },
//   {
//     name: 'Resistor',
//     slug: 'resistor'
//   },
//   {
//     name: 'Gerador de Funções',
//     slug: 'gerador de funções'
//   },
// ]
