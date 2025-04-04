'use server'

import Produto from "@/app/db/models/produto"
import { ProdutoType } from "../../app/types"
import { redirect } from "next/navigation"

export async function cadastrarProduto(data: FormData) {
    const produto: ProdutoType = {
        nome: data.get('nome')?.toString() || '',
        valor: Number(data.get('valor')?.toString()) || 0,
        estoque: Number(data.get('estoque')?.toString()) || 0,
    } 

    const p = await Produto.create(produto)
    console.log("Produto cadastrado", p)

    redirect('/')
}

export async function atualizarProduto(data: FormData) {
    const p = await Produto.findOneAndUpdate(
        {_id: data.get('id')},
        {
            nome: data.get('nome')?.toString() || '',
            valor: Number(data.get('valor')?.toString()) || 0,
            estoque: Number(data.get('estoque')?.toString()) || 0,
        }
    )

    redirect(`/produtos/${p.id}`)
}

export async function removerProduto(id: string) {
    await Produto.deleteOne(
        {_id: id}
    )

    redirect('/produtos')
}