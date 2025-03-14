import dotenv from 'dotenv'
dotenv.config()

import Produto from './classes/produto'
import Categoria from './classes/categoria'
import Cliente from './classes/cliente'
import express from 'express'
import cors from 'cors'

const app = express()
const PORTA = process.env.PORTA

app.use(cors())
app.use(express.json());

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find()
  res.send(produtos)
})


app.post('/produtos', async (req, res) => {
 try {
  const produto = await Produto.create({ 
    nome: req.body.nome,
    valor: req.body.valor
  })

  res.send(produto)
 } catch(error) {
  console.error('Erro:', error);
    res.status(500).send(error)
 }
})

app.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id)
  if (produto) {
    res.send(produto)
  } else {
    res.status(404).send('Produto não encontrado')
  }
})
// REGEX 
app.get('/produtos/search/:nome', async (req, res) => {
 const produto = await Produto.find({
    nome: {
        $regex: `^${req.params.nome}`,
        $options: "i" // Case-insensative
    }
 })
 res.send(produtos)
})


app.put('/produtos/:id', async (req, res) => {
   try {
    const produto = await Produto.updateOne({_id: req.params.id},
        { nome: req.body.nome,
          valor: req.body.valor})
    
      res.sendStatus(200)
   } catch (error) {
    console.error("", error);
    res.error(500).send(error)
   }
})

// Deletar um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
  await Produto.FindByIdAndDelete({ _id: req.params.id})
  res.status(200).send()
})
//Produtos tá certo

//categoria ---
app.get('/categorias', async (req, res) => {
  const categorias = await Categoria.find()
  res.send(categorias)
})


app.post('/categorias', async (req, res) => {
 try {
  const categoria = await Categoria.create({ 
    nome: req.body.nome,
    valor: req.body.valor
  })

  res.send(categoria)
 } catch(error) {
  console.error('Erro:', error);
    res.status(500).send(error)
 }
})

app.get('/categorias/:id', async (req, res) => {
  const categoria = await Categoria.findById(req.params.id)
  if (categoria) {
    res.send(categoria)
  } else {
    res.status(404).send('Produto não encontrado')
  }
})
// REGEX 
app.get('/categorias/search/:nome', async (req, res) => {
 const produto = await Categoria.find({
    nome: {
        $regex: `^${req.params.nome}`,
        $options: "i" // Case-insensative
    }
 })
 res.send(categorias)
})


app.put('/categorias/:id', async (req, res) => {
   try {
    const categoria = await Categoria.updateOne({_id: req.params.id},
        { nome: req.body.nome,
          valor: req.body.valor})
    
      res.sendStatus(200)
   } catch (error) {
    console.error("", error);
    res.error(500).send(error)
   }
})

// Deletar um produto pelo ID
app.delete('/categorias/:id', async (req, res) => {
  await Categoria.FindByIdAndDelete({ _id: req.params.id})
  res.status(200).send()
})

// Categoria praticamente pronta(falta conferir)
//API "ouvindo"
app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})
