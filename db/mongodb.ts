// import mongoose from './mongodb'
// import Produto from './models/produto';
// import Usuario from './models/usuario';

// mongoose.connect(
//   process.env.MONGODB_URL || 'mongodb://localhost:27017/led'
// ).then(async() => {
  
// console.log("MongoDB conectado!");

// console.log('Lista de Usuarios:', Usuario);

// const produtos = await Produto.find({});
// console.log('Lista de Produtos:', produtos);

// }).catch(err => console.error("Erro ao conectar:", err))
// mongoose.set('debug', true)

// export default mongoose

// import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
// import Produto from "./models/produto";

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/led";

// // Conectar com mongoose
// const mongooseConnection = mongoose
//   .connect(MONGODB_URI)
//   .then(async () => {
//     console.log("MongoDB conectado!");

//     // Apenas para testar a conexão e listar produtos
//     const produtos = await Produto.find({});
//     console.log("Lista de Produtos:", produtos);
//   })
//   .catch((err) => console.error("Erro ao conectar:", err));

// mongoose.set("debug", true);

// // Conectar com MongoClient para NextAuth
// const client = new MongoClient(MONGODB_URI, {});
// const clientPromise = client.connect();

// // Exportar as conexões
// export { mongooseConnection, clientPromise };
// export default mongoose;




// import  mongoose, {ConnectOptions}  from '@/app/db/mongodb'; //importar arquivo
// import { MongoClient } from "mongodb";
// import Produto from "./models/produto";
// import Usuario from "./models/usuario"

// // URL de conexão com o banco de dados MongoDB
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/led";

// let isConnected = false; // Flag para verificar a conexão

// // Função para garantir que a conexão com o MongoDB será feita apenas uma vez
//  const connectToDatabase = async (): Promise<void> => {
//   if (isConnected) {
//     console.log("Já conectado ao MongoDB.");
//     return;
//   }

//   try {
//     // Conectar com Mongoose
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as ConnectOptions); // Garantir que estamos usando as opções corretas para o Mongoose
//     isConnected = true;
//     console.log("MongoDB conectado!");
//     //testar conexão e listar usuarios
//     const usuarios = await  Usuario.find({});
//     console.log("Lista de Produtos:", usuarios);

//     // Apenas para testar a conexão e listar produtos
//     const produtos = await Produto.find({});
//     console.log("Lista de Produtos:", produtos);
//   } catch (err) {
//     console.error("Erro ao conectar:", err);
//     throw new Error("Falha na conexão com o banco de dados");
//   }

//   mongoose.set("debug", true);
// };

// // Conectar com MongoClient para NextAuth (caso precise)
// const client = new MongoClient(MONGODB_URI, {});
// const clientPromise = client.connect();

// // Exportar as conexões
// export { clientPromise, connectToDatabase };
// connectToDatabase()
// // export default mongoose;
// export default ConnectOptions;



import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/led";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("⚡ Já conectado ao MongoDB!");
      return;
    }

    console.log("⏳ Conectando ao MongoDB...");
    await mongoose.connect(MONGO_URI, {
      dbName: "led",
    });

    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Para evitar que a aplicação continue rodando sem banco de dados
  }
};

export default mongoose;
