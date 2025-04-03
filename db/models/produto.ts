
// import mongoose from '@/app/db/mongodb'

// const ProdutoSchema = new mongoose.Schema({
//     nome: { type: String, required: true, index: true },
//     valor: { type: Number, required: false },
//     estoque: { type: Number, required: false }
//   },
//   {
//     versionKey: false
//   }
// )

// const Produto = mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema)

// export default Produto
/* eslint-disable @typescript-eslint/no-explicit-any */



// interface Produto {
//   _id: string;
//   id: number; 
//   name: string;
//   valor: number;
//   qtde: number;
//   img: string; 
//   imageId: number;
//   // ... outras propriedades
// }


// interface ProdutoQuery extends Query<Produto[], Document> {
//   _startTime?: number;
// }
import mongoose from '@/app/db/mongodb'
const ProdutoSchema = new mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true, index: true },
    valor: { type: Number, required: false },
    qtde: { type: Number, required: false },
    img: { type: String },
    imageId: { type: Number }
  },
  {
    versionKey: false
  }
)

// ProdutoSchema.pre<ProdutoQuery>(/^find/, function (next) {
//   this._startTime = Date.now();
//   next();
// });

// ProdutoSchema.post<ProdutoQuery>(/^find/, function (docs, next) {
//   const duration = Date.now() - this._startTime!;
//   console.log(`Consulta demorou ${duration}ms`);
//   next();
// });


const Produto = mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema)

export default Produto

