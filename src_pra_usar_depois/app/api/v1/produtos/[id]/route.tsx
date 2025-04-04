
// import { PRODUTOS } from " /led/src/app2/api/v1/produtos/route"

// export async function GET(request, { params }) {
//     const { id } = await params
//     const produtos = PRODUTOS.find((e) => e.id == id)
    
//     if (!PRODUTOS) {
//         return Response.error()
//     }

//     return Response.json(PRODUTOS)
// }

//daqui pra baixo tá com cache  
// const redis = require ('redis')

// const client = redis.createClient({ username: 'default',
//          password: '8BDhEOLJqtseB0waMB9pYUycP371e5OC',
//          socket: {
//              host: 'redis-17778.c266.us-east-1-3.ec2.redns.redis-cloud.com',
//              port: 17778
// }});

// client.on('error', err => console.log('Redis Client Error', err));

// async function teste() {
//     await client.connect();

//     const produtos = [{id: 1, nome: "LED", qtde: 10}, {id: 2, nome: "Resistor", qtde: 5}]
//     // await client.del('produtos') seria pra deletar um cache, porém talvez não precise, pois, quando dá um .set ele já sobrescreve. 
//     await client.set('produtos', JSON.stringify(produtos), {EX: 300});
//     return JSON.parse(await client.get('produtos'));
// }

// teste().then ((res) => {
//     console.log('produtos: ', res)

//     setTimeout(async function(){
//         console.log("produtos depois de 3 segundos: ", JSON.parse(await client.get('produtos')))
//     }, 3000)
// })

// o get, push e post, já tem aqui 

// import { NextApiRequest, NextApiResponse } from 'next';
// import redis from 'redis';

// // Criando o cliente Redis
// const client = redis.createClient({
//     username: 'default',
//     password: '8BDhEOLJqtseB0waMB9pYUycP371e5OC',
//     socket: {
//         host: 'redis-17778.c266.us-east-1-3.ec2.redns.redis-cloud.com',
//         port: 17778
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await client.connect();

//     if (req.method === 'POST') {
//         try {
//             const { nome, valor, estoque } = req.body;

//             // Recuperando produtos existentes
//             const produtosCache = await client.get('produtos');
//             let produtos = produtosCache ? JSON.parse(produtosCache) : [];

//             // Criando novo produto
//             const novoProduto = {
//                 _id: produtos.length + 1,
//                 nome,
//                 valor,
//                 estoque
//             };

//             // Adicionando ao array e salvando no Redis
//             produtos.push(novoProduto);
//             await client.set('produtos', JSON.stringify(produtos), { EX: 300 });

//             res.status(201).json({ message: 'Produto cadastrado', produto: novoProduto });
//         } catch (error) {
//             const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
//             res.status(500).json({ message: 'Erro ao salvar produto', error: errMsg });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).json({ message: 'Método não permitido' });
//     }

//     await client.quit();
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import redis from 'redis';

// // Criando o cliente Redis
// const client = redis.createClient({
//     username: 'default',
//     password: '8BDhEOLJqtseB0waMB9pYUycP371e5OC',
//     socket: {
//         host: 'redis-17778.c266.us-east-1-3.ec2.redns.redis-cloud.com',
//         port: 17778
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await client.connect();

//     const { _id } = req.query; // Obtém o ID da URL
//     const idNumber = Number(_id); // Converte o ID para um número (ou use ObjectId se for MongoDB)

//     if (req.method === 'GET') {
//         try {
//             // Recuperando produtos existentes
//             const produtosCache = await client.get('produtos');
//             let produtos = produtosCache ? JSON.parse(produtosCache) : [];

//             // Buscando o produto pelo ID
//             const produto = produtos.find((e: any) => e._id === idNumber); // Compara pelo ID (certifique-se de que o tipo de ID seja consistente)

//             if (!produto) {
//                 return res.status(404).json({ message: 'Produto não encontrado' });
//             }

//             return res.status(200).json(produto); // Retorna o produto encontrado
//         } catch (error) {
//             const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
//             res.status(500).json({ message: 'Erro ao buscar produto', error: errMsg });
//         }
//     } else if (req.method === 'POST') {
//         try {
//             const { nome, valor, estoque } = req.body;

//             // Recuperando produtos existentes
//             const produtosCache = await client.get('produtos');
//             let produtos = produtosCache ? JSON.parse(produtosCache) : [];

//             // Criando novo produto
//             const novoProduto = {
//                 _id: produtos.length + 1,
//                 nome,
//                 valor,
//                 estoque
//             };

//             // Adicionando ao array e salvando no Redis
//             produtos.push(novoProduto);
//             await client.set('produtos', JSON.stringify(produtos), { EX: 300 });

//             res.status(201).json({ message: 'Produto cadastrado', produto: novoProduto });
//         } catch (error) {
//             const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
//             res.status(500).json({ message: 'Erro ao salvar produto', error: errMsg });
//         }
//     } else if (req.method === 'PUT') {
//         // Editar um produto existente
//         try {
//             const { nome, valor, estoque } = req.body;

//             // Recuperando produtos existentes
//             const produtosCache = await client.get('produtos');
//             let produtos = produtosCache ? JSON.parse(produtosCache) : [];

//             // Encontrando o produto pelo ID
//             const produtoIndex = produtos.findIndex((e: any) => e._id === idNumber);
//             if (produtoIndex === -1) {
//                 return res.status(404).json({ message: 'Produto não encontrado' });
//             }

//             // Atualizando os dados do produto
//             produtos[produtoIndex] = {
//                 ...produtos[produtoIndex],
//                 nome,
//                 valor,
//                 estoque
//             };

//             // Salvando os produtos no Redis
//             await client.set('produtos', JSON.stringify(produtos), { EX: 300 });

//             res.status(200).json({ message: 'Produto atualizado', produto: produtos[produtoIndex] });
//         } catch (error) {
//             const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
//             res.status(500).json({ message: 'Erro ao atualizar produto', error: errMsg });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'POST', 'PUT']);
//         res.status(405).json({ message: 'Método não permitido' });
//     }

//     await client.quit();
// }




import { NextApiRequest, NextApiResponse } from 'next'
import redis from 'redis'

// Criando o cliente Redis
const client = redis.createClient({
  username: 'default',
  password: '8BDhEOLJqtseB0waMB9pYUycP371e5OC',
  socket: {
    host: 'redis-17778.c266.us-east-1-3.ec2.redns.redis-cloud.com',
    port: 17778,
  },
})

client.on('error', (err) => console.log('Redis Client Error', err))


// Método GET para buscar um produto pelo ID
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Obtém o ID do produto da URL

  try {
    if (!id) {
      return res.status(400).json({ message: 'ID do produto não fornecido' });
    }

    // Recuperando produtos existentes do cache
    const produtosCache = await client.get('produtos');
    let produtos = produtosCache ? JSON.parse(produtosCache) : [];

    // Buscando o produto pelo ID
    const produto = produtos.find((e: any) => e.id === Number(id)); // ID esperado como número

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(200).json(produto); // Retorna o produto encontrado
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ message: 'Erro ao buscar produto', error: errMsg });
  }
}

// Método GET para buscar um produto pelo name
// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     const { name } = req.query; // Obtém o nome do produto da URL
  
//     try {
//       if (!name) {
//         return res.status(400).json({ message: 'Nome do produto não fornecido' });
//       }
  
//       // Recuperando produtos existentes do cache
//       const produtosCache = await client.get('produtos');
//       let produtos = produtosCache ? JSON.parse(produtosCache) : [];
  
//       // Buscando os produtos que contêm o nome pesquisado (case insensitive)
//       const produtosFiltrados = produtos.filter((e: any) =>
//         e.name.toLowerCase().includes((name as string).toLowerCase())
//       );
  
//       if (produtosFiltrados.length === 0) {
//         return res.status(404).json({ message: 'Nenhum produto encontrado' });
//       }
  
//       return res.status(200).json(produtosFiltrados); // Retorna os produtos encontrados
//     } catch (error) {
//       const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
//       res.status(500).json({ message: 'Erro ao buscar produtos', error: errMsg });
//     }
//   }
  

// Método POST para criar um novo produto
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nome, valor, estoque } = req.body

    // Recuperando produtos existentes
    const produtosCache = await client.get('produtos')
    let produtos = produtosCache ? JSON.parse(produtosCache) : []

    // Criando novo produto
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      valor,
      estoque,
    }

    // Adicionando ao array e salvando no Redis
    produtos.push(novoProduto)
    await client.set('produtos', JSON.stringify(produtos), { EX: 300 })

    res.status(201).json({ message: 'Produto cadastrado', produto: novoProduto })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Erro desconhecido'
    res.status(500).json({ message: 'Erro ao salvar produto', error: errMsg })
  }
}

// Método PUT para atualizar um produto existente
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const idNumber = Number(id)

  try {
    const { nome, valor, estoque } = req.body

    // Recuperando produtos existentes
    const produtosCache = await client.get('produtos')
    let produtos = produtosCache ? JSON.parse(produtosCache) : []

    // Encontrando o produto pelo ID
    const produtoIndex = produtos.findIndex((e: any) => e.id === idNumber)
    if (produtoIndex === -1) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    // Atualizando os dados do produto
    produtos[produtoIndex] = {
      ...produtos[produtoIndex],
      nome,
      valor,
      estoque,
    }

    // Salvando os produtos no Redis
    await client.set('produtos', JSON.stringify(produtos), { EX: 300 })

    res.status(200).json({ message: 'Produto atualizado', produto: produtos[produtoIndex] })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Erro desconhecido'
    res.status(500).json({ message: 'Erro ao atualizar produto', error: errMsg })
  }
}

// Tratando outros métodos HTTP
export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', ['GET', 'POST', 'PUT'])
  res.status(405).json({ message: 'Método não permitido' })
}

