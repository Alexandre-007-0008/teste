
export type UserType = {
    login: string
    senha?: string
}

export type ProdutoType = {
    _id: string  //perguntar a Luciano o motivo disso(reclamou do number e aceitou undefined)
    id: number
    name: string
    valor?: number
    qtde?: number
    img: string
    imageId: number
    // description: string dá pra usar isso(descrição do produto)
}

// number |


export interface PedidoType {
    _id: string;  // ID único do pedido
    produto: string;  // Nome do produto
    quantidade: number;  // Quantidade do produto
    valorTotal: number;  // Valor total do pedido
    status: string;  // Status do pedido (ex: 'Em andamento', 'Concluído', etc.)
  }