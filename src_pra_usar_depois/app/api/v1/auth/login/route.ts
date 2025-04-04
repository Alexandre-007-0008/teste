import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "@/app/db/models/usuario";
import "@/app/db/mongodb"; // Garante que a conexão com o MongoDB seja importada

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    // Buscar usuário pelo e-mail
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Criar token JWT
    const token = jwt.sign(
      { usuarioId: usuario.id, email: usuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token }, { status: 200 });

  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
