// export async function generateMetadata({ params, searchParams }, parent) {
//     const { slug } = await params
    
//     // Resgatar o conteúdo
  
//     return {
//       title: `Produto: ${slug}`,
//       description: `Página sobre ${slug}`
//     }
//   }
//     // const { cadastro } = useUser()
  
//     async function handleSubmit(event) {
//       event.preventDefault() //previne o recarregamento da página 
//       const formData = new FormData(event.currentTarget)
//       const cadastroUsuario = formData.get('cadastro')
   
//       try {
//         await login(loginUsuario, senhaUsuario)
//       } catch(e) {
//         console.log("Erro de cadastro", e)
//         alert("Cadastro inválido")
//       }}


//   export default async function Page({ params }) {
//     const { slug } = await params
  
//     return (
//       <>
//         <div class="top-bar">
//         <div class="logo">Electronic's Place</div>
//         <div class="user-area">
//             <a  href="sigin.html">
//                 <img class="button-img button-img2"/>
//             </a>
//             <a href="sigin.html">
//                 <img class="button-img button-img1"/>
//             </a> 
//         </div>
//     </div>
//     <div class="search-container">
//         <input type="text" placeholder="Pesquisar..."/>
//     </div>

//     <div>
//         <a href="produto1.html">
//         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzTYASyjkobHJGukdlKZLM-GJQTlng--ZDVg&s"/>
//         </a>

//         <a href="produto2.html">
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzTYASyjkobHJGukdlKZLM-GJQTlng--ZDVg&s"/>

//         </a>

//         <a href="produto3.html">
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWlLOhT0N6SzVEF0nHB83pwnHYwwM-kaUjqQ&s"/>
//         </a>

//         <a href="produto4.html">
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN8I0nJE4JpaIo4xuxhfl76a7ZJKhdGrb48w&s"/>
//         </a>

//         <a href="produto5.html">
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzTYASyjkobHJGukdlKZLM-GJQTlng--ZDVg&s"/>
        
//         </a>

//         <a href="produto6.html">
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzTYASyjkobHJGukdlKZLM-GJQTlng--ZDVg&s"/>
//         </a>
//     </div>
//         Produto: { slug }
//         <form>
//           <input type="novo produto" name="login" placeholder="novo produto" required autoFocus />
//           <button type="submit">Cadastrar produto</button>
//         </form>  
//       </>
//     )
//   }
  
// import Produto from '@/app/db/models/produto'
// import { ReactNode } from 'react'
// import mongoose from 'mongoose'
// interface params {
//   slug: string;
// }

// // ({ params, searchParams }: any, parent: any)
// export async function generateMetadata({ params }: { params: { _id: string } }) {
//     try{

//       const { _id } = await params
//       const produto = await Produto.findById(_id)

//       if (!produto) {
//         return {
//           title: "Produto não encontrado",
//           description: "Este produto não existe."
//         }
//       }
//       return {
//         title: produto.name,
//         description: `Página do produto ${produto.name}`
//       }
//     }  catch (error) {
//       console.error('Erro ao gerar metadata para o produto:', error) // Log para depuração
//       return {
//         title: "Erro ao carregar produto",
//         description: "Ocorreu um erro ao carregar os dados do produto.",
//       }
//     }  
// }
  
//   export default async function Page({ params }: any) : Promise<ReactNode> {
//     try {
//       const { _id } = params
  
//       // Verifique se o ID é válido
//       if (!mongoose.Types.ObjectId.isValid(_id as string)) {
//         return <div>ID inválido</div>
//       }
  
//       const produto = await Produto.findById(_id)
  
//       if (!produto) {
//         return <div>Produto não encontrado</div>
//       }
  
//       return (
//         <>
//           <div className="top-bar">
//             <div className="logo"><a href="/">Electronic's Place</a></div>
//             <div className="user-area">
//               <a href="/carrinho">
//                 <img className="button-img button-img2" />
//               </a>
//               <a href="/login">
//                 <img className="button-img button-img1" />
//               </a>
//             </div>
//           </div>
//           <h1>{produto.name}</h1>
//           <p>Valor: R$ {produto.valor}</p>
//           <p>Estoque: {produto.qtde}</p>
//         </>
//       )
//     } catch (error) {
//       console.error('Erro ao carregar o produto:', error) // Log para depuração
//       return <div>Ocorreu um erro ao carregar os dados do produto.</div>
//     }
//   }

//c
// import Produto from '@/app/db/models/produto';
// import { ReactNode } from 'react';
// import mongoose from 'mongoose';

// export default async function Page({ params }: any): Promise<ReactNode> {
//   try {
//     // Extrair o ID através do URL diretamente
//     // Utilizando uma abordagem mais robusta
//     const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
//     const pathSegments = pathname.split('/');
//     const idFromPath = pathSegments[pathSegments.length - 1];
    
//     // Se não conseguir extrair do path, tente params
//     let idParam = '';
    
//     try {
//       // Trate params de forma segura sem acessar diretamente suas propriedades
//       const paramsObj = await Promise.resolve(params);
//       if (paramsObj && typeof paramsObj === 'object') {
//         idParam = String(Object.values(paramsObj)[0] || '');
//       }
//     } catch (e) {
//       console.error('Erro ao processar params:', e);
//     }
    
//     // Use o ID do path ou do params, o que estiver disponível
//     const id = idFromPath || idParam;
    
//     if (!id) {
//       return <div>Parâmetro ID ausente</div>;
//     }
    
//     const numericId = Number(id);
//     if (isNaN(numericId)) {
//       return <div>ID inválido</div>;
//     }
//     console.log("ID sendo buscado:", numericId, typeof numericId);
//     await mongoose.connect(process.env.MONGODB_URI!);
    
//     // Extrair o ID e garantir que é uma string para corresponder ao formato no banco
//     const idString = String(id);
//     console.log("Buscando produto com ID:", idString);

//     // Buscar o produto usando o ID como string
//     const produto = await Produto.findOne({ id: idString });

//     // const produto = await Produto.findOne({ id: numericId });

//     console.log("Produto encontrado:", produto);
//     const todosOsProdutos = await Produto.find({});
//     console.log("Total de produtos:", todosOsProdutos.length);
//     console.log("Primeiros produtos:", todosOsProdutos.slice(0, 2));
    
//     if (!produto) {
//       return <div>Produto não encontrado</div>;
//     }
    
//     return (
//       <>
//         <div className="top-bar">
//           <div className="logo"><a href="/">Electronic's Place</a></div>
//           <div className="user-area">
//             <a href="/carrinho">
//               <img className="button-img button-img2" alt="Carrinho" />
//             </a>
//             <a href="/login">
//               <img className="button-img button-img1" alt="Login" />
//             </a>
//           </div>
//         </div>
//         <p>ID: {id}</p>
//         <h1>{produto.name}</h1>
//         <p>Valor: R$ {produto.valor}</p>
//         <p>Estoque: {produto.qtde}</p>
//         <div className="bottom-bar">
//           <div className="espaço">
//             <a href="/fale-conosco">Fale conosco!</a>
//             <a href="/fale-conosco">Divulgue sua marca no nosso site!</a>
//           </div>
//         </div>
//       </>
//     );
//   } catch (error) {
//     console.error('Erro ao carregar o produto:', error);
//     return <div>Ocorreu um erro ao carregar os dados do produto.</div>;
//   }
// }

import Produto from '@/app/db/models/produto';
import { ReactNode } from 'react';
import mongoose from 'mongoose';

export default async function Page({ params }: any): Promise<ReactNode> {
  try {
    // Extrair o ID através do URL diretamente
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const pathSegments = pathname.split('/');
    const idFromPath = pathSegments[pathSegments.length - 1];
    
    let idParam = '';
    try {
      const paramsObj = await Promise.resolve(params);
      if (paramsObj && typeof paramsObj === 'object') {
        idParam = String(Object.values(paramsObj)[0] || '');
      }
    } catch (e) {
      console.error('Erro ao processar params:', e);
    }

    const id = idFromPath || idParam;
    
    if (!id) {
      return <div>Parâmetro ID ausente</div>;
    }

    const idString = String(id);
    console.log("ID sendo buscado:", idString);  // Verifique o ID que está sendo buscado
    
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Verifique todos os produtos para ver o formato do ID
    const todosOsProdutos = await Produto.find({});
    console.log("Todos os produtos no banco:", todosOsProdutos);

    // Buscar o produto usando o ID como string
    const produto = await Produto.findOne({ id: idString });
    console.log("Produto encontrado:", produto);

    if (!produto) {
      return <div>Produto não encontrado</div>;
    }
    
    return (
      <>
        <div className="top-bar">
          <div className="logo"><a href="/">Electronic's Place</a></div>
          <div className="user-area">
            <a href="/carrinho">
              <img className="button-img button-img2" alt="" />
            </a>
            <a href="/login">
              <img className="button-img button-img1" alt="" />
            </a>
          </div>
        </div>
        <div className="lista">
        <img src={produto.img || `/imagens/produto${produto._id}.png`} alt={produto.name}/>
        <h1><strong>{produto.name}</strong></h1>
        <p>Valor: R$ {produto.valor}</p>
        <p>Estoque: {produto.qtde}</p>
        <button className="adicionar"><a href={`/carrinho/${produto.id}`}>Adicionar ao carrinho</a></button>
        </div>
        <div className="bottom-bar">
          <div className="espaço">
            <a href="/fale-conosco">Fale conosco!</a>
            <a href="/fale-conosco">Divulgue sua marca no nosso site!</a>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Erro ao carregar o produto:', error);
    return <div>Ocorreu um erro ao carregar os dados do produto.</div>;
  }
}

// import Produto from '@/app/db/models/produto' 
// import { ReactNode } from 'react'
// import mongoose from 'mongoose'
// import { NextRequest } from 'next/server';


// // interface Params {
// //   id: number;
// // }

// type Params = { id: number };
// // const { id } = params;

// // export async function generateMetadata({ params }: { params: Params }) {
//   export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI!); // Conecta ao banco

//       const id = Number(params.id);
//    // Verifique se está acessando o _id corretamente
//     const produto = await Produto.findById(id);

//     if (!produto) {
//       return {
//         title: "Produto não encontrado",
//         description: "Este produto não existe."
//       }
//     }

//     return {
//       title: produto.name,
//       description: `Página do produto ${produto.name}`
//     }
//   } catch (error) {
//     console.error('Erro ao gerar metadata para o produto:', error);
//     return {
//       title: "Erro ao carregar produto",
//       description: "Ocorreu um erro ao carregar os dados do produto."
//     }
//   }
// }

// export default async function Page({ params }: { params: Params }) : Promise<ReactNode> {
//   try {
//     const { id } = params.id;  // Acessando o _id corretamente

//     // // Verifique se o ID é válido
//     // if (!mongoose.Types.ObjectId.isValid(id as number)) {
//     //   return <div>ID inválido</div>;
//     // }
//     if (isNaN(id)) {
//       return <div>ID inválido</div>;
//     }

//     const produto = await Produto.findById(id);
    

//     if (!produto) {
//       return <div>Produto não encontrado</div>;
//     }

//     return (
//       <>
//         <div className="top-bar">
//           <div className="logo"><a href="/">Electronic's Place</a></div>
//           <div className="user-area">
//             <a href="/carrinho">
//               <img className="button-img button-img2" />
//             </a>
//             <a href="/login">
//               <img className="button-img button-img1" />
//             </a>
//           </div>
//         </div>
//         {<h2>{produto.id}</h2>}
//         {<h1>{produto.name}</h1>}
//         <p>Valor: R$ {produto.valor}</p>
//         <p>Estoque: {produto.qtde}</p>
//         <div className="bottom-bar">
//         <div className="espaço">
//           <a href="/fale-conosco">Fale conosco!</a>
//           <a href="/fale-conosco">Divulgue sua marca no nosso site!</a>
//         </div>
//       </div>
//       </>
//     );
//   } catch (error) {
//     console.error('Erro ao carregar o produto:', error);
//     return <div>Ocorreu um erro ao carregar os dados do produto.</div>;
//   }
// }


//tava assim antes(só pra não perder)

//   import Produto from '@/app/db/models/produto'
// import { ReactNode } from 'react'
// import mongoose from 'mongoose'
// interface params {
//   slug: string;
// }

// // ({ params, searchParams }: any, parent: any)
// export async function generateMetadata({ params }: { params: { id: string } }) {
//       const { id } = await params
//       const produto = await Produto.findById(id)

//       if (!produto) {
//         return {
//           title: "Produto não encontrado",
//           description: "Este produto não existe.",
//         };
//       }
    
//       return {
//         title: produto.name,
//         description: Página do produto ${produto.name}
//       }
//     }
  
//   export default async function Page({ params }: any) : Promise<ReactNode> {
//     const { id } = await params
//     const produto = await Produto.findById( id ) 

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return <div>ID inválido</div>; // Retorna um erro amigável caso o ID seja inválido
//   }

//     if (!produto) { // Verifique se o produto é null antes de renderizar
//       return <div>Carregando produto...</div>; // Mostra uma mensagem de carregamento ou outro indicador
//     }
//     return (
//       <>
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
//         <h1>{ produto.name }</h1>
//         <p>Valor: R$ {produto.valor}</p>
//         <p>Estoque: {produto.qtde}</p>
//       </>
//     )
//   }