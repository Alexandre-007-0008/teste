import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose'; // Conexão com o banco
import Produto from '@/app/db/models/produto'; // Modelo do produto

export async function GET(req: NextRequest) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Nome não fornecido' }, { status: 400 });
    }

    // Faz a busca no banco de dados por produtos que tenham o nome correspondente
    const produtos = await Produto.find({ name: { $regex: name, $options: 'i' } });

    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
