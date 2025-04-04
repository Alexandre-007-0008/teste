'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PedidoType } from '../../types';  // Você pode criar o tipo `PedidoType` conforme seu modelo.

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);  // Estado para armazenar os pedidos
  const [qtdePedidos, setQtdePedidos] = useState<number>(0);  // Estado para armazenar quantidade total de pedidos

  const carregarPedidos = async () => {
    try {
      // Carregar pedidos do usuário da API
      const responsePedidos = await axios.get<PedidoType[]>('http://localhost:3000/api/v1/pedidos');
      setPedidos(responsePedidos.data);  // Atualiza os pedidos com os dados da API

      // Carregar quantidade total de pedidos
      const responseQuantidade = await axios.get<{ total: number }[]>('http://localhost:3000/api/v1/relatorios/quantidade');
      setQtdePedidos(responseQuantidade.data[0] ? responseQuantidade.data[0].total : 0);  // Atualiza a quantidade
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
      alert("Erro ao carregar os pedidos.");
    }
  };

  useEffect(() => {
    carregarPedidos();  // Carregar os dados de pedidos quando o componente for montado
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
          <input type="text" placeholder="Pesquisar pedidos..." />
        </div>

        <div className="pedido-central">
          {pedidos.length === 0 ? (
            <p>Nenhum pedido encontrado.</p>
          ) : (
            pedidos.map((pedido) => (
              <div key={pedido._id} className="pedido-card">
                <div className="pedido-details">
                  <p><strong>ID do Pedido:</strong> {pedido._id}</p>
                  <p><strong>Produto:</strong> {pedido.produto}</p>
                  <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
                  <p><strong>Valor Total:</strong> R${pedido.valorTotal}</p>
                  <p><strong>Status:</strong> {pedido.status}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="total-pedidos">
          <p>Total de Pedidos: {qtdePedidos}</p>
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
