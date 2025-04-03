import mongoose, { Schema, Document } from 'mongoose';

export interface IPedido extends Document {
  usuarioId: string; // ID do usuário que fez o pedido
  produtos: {
    produtoId: string;
    name: string;
    qtde: number;
    valor: number;
  }[];
  total: number;
  status: string; // Exemplo: "pendente", "concluído", "cancelado"
  metodoPagamento: string; // Exemplo: "cartão", "boleto", "pix"
  criadoEm: Date;
}

// Criando o schema
const PedidoSchema = new Schema<IPedido>({
  usuarioId: { type: String, required: true },
  produtos: [
    {
      produtoId: { type: String, required: true },
      name: { type: String, required: true },
      qtde: { type: Number, required: true, default: 1 },
      valor: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, required: true, default: "pendente" },
  metodoPagamento: { type: String, required: true, default: "pix" },
  criadoEm: { type: Date, default: Date.now },
});

// Verifica se o modelo já foi criado para evitar erro de duplicação
const Pedido = mongoose.models.Pedido || mongoose.model<IPedido>("Pedido", PedidoSchema);

export default Pedido;
