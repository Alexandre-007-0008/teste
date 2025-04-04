// const PORTA = 3000  // Ou qualquer outra porta que quiser
// import Produto from 'api/v1/produtos' 
// import express from 'express'
// import cors from 'cors'

// const app = express()


// app.use(cors())
// app.use(express.json());

// app.get('/produtos', async (req, res) => {
//   const produtos = await Produto.find()
//   res.send(produtos)
// })

// //Cadastrar produtos
// app.post('/produtos', async (req, res) => {
//  try {
//   const produto = await Produto.create({ 
//     nome: req.body.nome,
//     valor: req.body.valor
//   })

//   res.send(produto)
//  } catch(error) {
//   console.error('Erro:', error);
//     res.status(500).send(error)
//  }
// })
// //Listar produtos
// app.get('/produtos/:id', async (req, res) => {
//   const produto = await Produto.findById(req.params.id)
//   if (produto) {
//     res.send(produto)
//   } else {
//     res.status(404).send('Produto não encontrado')
//   }
// })

// //Atualizar produtos
// app.put('/produtos/:id', async (req, res) => {
//    try {
//     const produto = await Produto.updateOne({_id: req.params.id},
//         { nome: req.body.nome,
//           valor: req.body.valor})
    
//       res.sendStatus(200)
//    } catch (error) {
//     console.error("Erro", error);
//     res.status(500).send(error)
//    }
// })

// // Deletar um produto pelo ID
// app.delete('/produtos/:id', async (req, res) => {
//   await Produto.FindByIdAndDelete({ _id: req.params.id})
//   res.status(200).send()
// })
// //Produtos tá certo


// //API "ouvindo"
// app.listen(PORTA, () => {
//   console.log(`API está ouvindo em http://localhost:${PORTA}`)
// })


const jwt = require("jsonwebtoken");

// Essa chave deve ser armazenada em locais seguros, nunca diretamente no código
const JWT_SECRET_KEY = 'chave_secreta'

const usuario = { id: "123", role: "admin" };
// função jwt.sign: gera o token
// Parâmetro expiresIn - tempo de validade do token
const token = jwt.sign(usuario, JWT_SECRET_KEY, { expiresIn: "1h" });

console.log("Token JWT:", token);

try {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  console.log('Dados do JWT', decoded)
} catch (error) {
  console.error("Token inválido ou expirado:", error)
}
  