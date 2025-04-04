import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; 
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/db/mongodb";
import Pedido from "@/app/db/models/pedido";
import { authOptions } from "@/app/api/v1/auth/[...nextauth]"; 
import Produto from "@/app/db/models/produto";

// GET - Busca pedidos do usuário logado
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  if (session.user.id !== id) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  try {
    const pedidos = await Pedido.find({ usuarioId: id }).exec();
    if (!pedidos.length) {
      return NextResponse.json({ error: "Nenhum pedido encontrado" }, { status: 404 });
    }

    return NextResponse.json(pedidos, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// PUT - Incrementa quantidade do pedido
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = params;
  const { action, produtoId } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  if (session.user.id !== id) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  try {
    const pedido = await Pedido.findOne({ usuarioId: id });

    if (!pedido) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    // Buscar o produto específico dentro do pedido
    const produto = pedido.produtos.find((p: Produto) => p.id === produtoId);
    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado no pedido" }, { status: 404 });
    }

    // Incrementa ou decrementa a quantidade do produto
    if (action === "increment") {
      produto.qtde += 1;
    } else if (action === "decrement" && produto.qtde > 1) {
      produto.qtde -= 1;
    } else {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    await pedido.save();

    return NextResponse.json({ message: "Quantidade atualizada", pedido }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return NextResponse.json({ error: "Erro ao atualizar pedido" }, { status: 500 });
  }
}



// // import { NextApiRequest, NextApiResponse } from 'next';
// // import mongoose from 'mongoose';
// // import { getSession } from 'next-auth/react';
// // import  {connectToDatabase}  from '@/app/db/mongodb';


// // const MONGODB_URI = process.env.MONGODB_URI || '';

// // if (!mongoose.connection.readyState) {
// //   mongoose.connect(MONGODB_URI, {
// //     useNewUrlParser: true,  
// //     useUnifiedTopology: true,
// //   } as any);
// // }

// // const db = mongoose.connection;
// // const pedidosCollection = db.collection('pedidos');

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   await connectToDatabase(); // Garante que o MongoDB está conectado  
// //   const session = await getSession({ req });
  
// //   if (!session) {
// //     return res.status(401).json({ error: 'Não autorizado' });  
// //   }

// //   const { id } = req.query;

// //   if (!id || typeof id !== 'string') {
// //     return res.status(400).json({ error: 'ID inválido' });  
// //   }

// //   if (req.method === 'GET') {
// //     try {
// //       const pedidos = await pedidosCollection.find({ usuarioId: id }).toArray();  
// //       return res.status(200).json(pedidos);
// //     } catch (error) {
// //       return res.status(500).json({ error: 'Erro ao buscar pedidos' });  
// //     }
// //   }

// //   if (req.method === 'PUT') {
// //     const { action } = req.body;  

// //     try {
// //       const update = action === 'increment' ? { $inc: { quantidade: 1 } } : {};  
// //       await pedidosCollection.updateOne({ usuarioId: id }, update);
// //       return res.status(200).json({ message: 'Quantidade atualizada' });
// //     } catch (error) {
// //       return res.status(500).json({ error: 'Erro ao atualizar pedido' });  
// //     }
// //   }

// //   return res.status(405).json({ error: 'Método não permitido' });
// // }

// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { connectToDatabase } from "@/app/db/mongodb";
// import Pedido from "@/app/db/models/pedido";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   await connectToDatabase();
  
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).json({ error: "Não autorizado" });
//   }

//   try {
//     const { produtos, total, metodoPagamento } = await req.json();

//     if (!produtos || produtos.length === 0) {
//       return res.status(400).json({ error: "Nenhum produto no pedido" });
//     }

//     const novoPedido = new Pedido({
//       usuarioId: session.user.id, // ID do usuário logado
//       produtos,
//       total,
//       status: "pendente",
//       metodoPagamento,
//     });

//     await novoPedido.save();
//     return res.status(201).json({ message: "Pedido criado com sucesso!" });
//   } catch (error) {
//     console.error("Erro ao criar pedido:", error);
//     return res.status(500).json({ error: "Erro interno ao criar pedido" });
//   }
// }
