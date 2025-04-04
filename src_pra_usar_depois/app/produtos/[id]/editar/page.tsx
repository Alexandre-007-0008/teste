// import { atualizarProduto } from '@/app/lib/actions'
// import Produto from '@/app/db/models/produto'

// export default async function Pagina({ params }: any) {
//     const { id } = await params

//     const produto = await Produto.findById(id)

//     return (
//         <>
//             <h1>Atualizar produto</h1>

//             <form action={atualizarProduto}>
//                 <input type='hidden' name='id' value={id} />
//                 <div>
//                     <label htmlFor='nome'>Nome do produto</label>
//                     <input
//                         id='nome'
//                         name='nome'
//                         type='text'
//                         defaultValue={produto.nome}
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

import { atualizarProduto } from '@/app/lib/actions'
import Produto from '@/app/db/models/produto'
import { ObjectId } from 'mongodb'; // Importar ObjectId

export default async function Pagina({ params }: any) {
    const { _id } = await params

    // Garantir que o id seja convertido para ObjectId
    const objectId = ObjectId.createFromTime(_id); 

    const produto = await Produto.findById(objectId);

    if (!produto) {
        // Trate o caso de produto não encontrado, se necessário
        return <p>Produto não encontrado</p>;
    }

    return (
        <>
          <div className="top-bar">s
              <div className="logo"><a href="/">Electronic's Place</a></div>
              <div className="user-area">
                  <a  href="/carrinho">
                      <img className="button-img button-img2"/>
                  </a>
                  <a href="/login">
                      <img className="button-img button-img1"/>
                  </a>
              </div>
          </div>
            <h1>Atualizar produto</h1>

            <form action={atualizarProduto}>
                <input type='hidden' name='id' value={_id} />
                <div>
                    <label htmlFor='nome'>Nome do produto</label>
                    <input
                        id='nome'
                        name='nome'
                        type='text'
                        defaultValue={produto.name} //Cannot read properties of null(reading "name") Provavelmente pq eu n tenho um banco de dados em casa ainda
                        autoFocus={true}
                    />

                    <label htmlFor='valor'>Valor do produto</label>
                    <input
                        id='valor'
                        name='valor'
                        type='number'
                        defaultValue={produto.valor}
                    />

                    <label htmlFor='estoque'>Estoque do produto</label>
                    <input
                        id='estoque'
                        name='estoque'
                        type='number'
                        defaultValue={produto.estoque}
                    />
                </div>

                <button>Salvar</button>
            </form>
        </>
    )
}
