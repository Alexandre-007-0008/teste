import NextAuth from "next-auth";
import { User } from "next-auth";

// Estender o tipo da sessão para incluir o campo 'id'
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adicionando 'id' como string
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  
  // Caso esteja utilizando o tipo de User, você pode também estender ele
  interface User {
    id: string; // Adicionando 'id' como string
  }
}
