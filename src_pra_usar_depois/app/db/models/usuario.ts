import mongoose from '@/app/db/mongodb';
// import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    id:  { type: String, index: true}, //era qual pra mudar aqui?
    login: { type: String, required: true, index: true },
    // email: { type: String, required: true, index: true },
    senha: { type: String, required: true },
    token_nova_senha: { type: String, required: false, index: true }, //mudei required pra false
  },
  {
    versionKey: false,
  }
)
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)
export default Usuario

