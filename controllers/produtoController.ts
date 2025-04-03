// produtoController.ts
import Produto from '@/app/db/models/produto';
// import { NextRequest, NextResponse } from 'next/server';

export const produtoController = {
  // Listar todos os produtos
  async listarProdutos() {
    try {
      const produtos = await Produto.find({});
      return produtos;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw new Error('Falha ao buscar produtos');
    }
  },

  // Buscar produto por ID
  async buscarProdutoPorId(id: string) {
    try {
      const produto = await Produto.findById(id);
      return produto;
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      throw new Error('Produto não encontrado');
    }
  },

  // Criar novo produto
  async criarProduto(data: { name: string; valor: number }) {
    try {
      const novoProduto = await Produto.create(data);
      return novoProduto;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new Error('Falha ao cadastrar produto');
    }
  },

  // Atualizar produto
  async atualizarProduto(id: string, data: { name?: string; valor?: number }) {
    try {
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        id, 
        data,
        { new: true } // Retorna o documento atualizado
      );
      return produtoAtualizado;
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      throw new Error('Falha ao atualizar produto');
    }
  },

  // Excluir produto
  async excluirProduto(id: string) {
    try {
      await Produto.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error(`Erro ao excluir produto com ID ${id}:`, error);
      throw new Error('Falha ao excluir produto');
    }
  }
};