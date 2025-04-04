// export async function GET(req, res) {
//     try{
//         const resultado = await Produto.aggregate([
//             { $count: 'quantidade' }
//         ]);
        
//         console.log ('Resultado:', resultado);
//         res.status(200).send(resultado)
//     } catch (error) {
//         console.error('Erro na agregação:', error);
//         res.status(500).send(error)
//     }
// }


// import Produto from '@/app/db/models/produto'

// export async function GET() {
//     const produtos = await Produto.aggregate([
//         { $count: 'total' }
//     ])

//     return Response.json(produtos)
// }

import Produto from '@/app/db/models/produto';
import { NextResponse } from 'next/server';

export async function GET() {

    try {
        const resultado = await Produto.aggregate([{ $count: 'total' }]);
        const total = resultado.length > 0 ? resultado[0].total : 0;

        return NextResponse.json({ total });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao contar produtos', error: error.message }, { status: 500 });
    }
}

// export async function POST() {

//     try {
//         const resultado = await Produto.aggregate([{ $count: 'total' }]);
//         const total = resultado.length > 0 ? resultado[0].total : 0;

//         return NextResponse.json({ total });
//     } catch (error) {
//         return NextResponse.json({ message: 'Erro ao contar produtos', error: error.message }, { status: 500 });
//     }
// }
