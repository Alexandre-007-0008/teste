require('dotenv').config()
const Produto = require('express')
const cors = require('express')

const app = express()
const PORTA = process.env.PORTA

const Produtos = []

app.use(cors())

app.use(express.json());

app.get('/produtos',(req,res) => {
    res.send(PRODUTOS)
})

//requisição post//
app.post('/produtos',(req,res) => {
    const ids =PRODUTOS.map((p) => p.id)
    let ultimoId = ids.lenght > 0? Math.max(...ids) : 0
    const id = ultimoId + 1

    const produto = new Produto(id,req.body.nome, req.body.valor)
    PRODUTOS.push(produto)

    res.send(produto)
})

//requisição get//
app.get('/produtos/:id', (req,res) => {
    const produto = PRODUTOS.find((p) => p.id == req.params.id)

    if (produto) {
        res.send(produto) 
    } else {
        response.status(404).send('produto não encontrado')
    }
})

//requisição put//
app.put('/produtos/:id',(req, res) => {
    const produtoIndex = PRODUTOS.findIndex(p => p.id == params.id)

    if (produtoIndex !== -1) {
        const produto = PRODUTOS[produtoIndex]

        produto.setNome(req.body.nome)
        produto.setValor(req.body.valor)

        PRODUTOS[produtoIndex] = produto

        res.sendStatus(200)
    } else {
        res.status(404).send('produto não encontrado')
    }
})

// Deletar um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
  const produtoIndex = PRODUTOS.findIndex(p => p.id == req.params.id)

  if (produtoIndex !== -1) {
    // Remove o elemento do index
    PRODUTOS.splice(produtoIndex, 1)
    // Retorna status de sucesso
    res.status(200).send()
  } else {
    res.status(404).send('Produto não encontrado')
  }
})


app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})

