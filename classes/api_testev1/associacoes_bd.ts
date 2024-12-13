import Produto from './produto'
import Categoria from './categoria'

Categoria.hasMany(Produto, {
    foreignKey: categoriaId,
    as: 'produtos',

})

Produto.BelongsTo(Categoria {
    foreignKey: categoriaId,
    as: 'categoria',
})

async function TestAssociations(){
    let [cat]: (any, boolean) = await Categoria.findOrCreat(
        {
            where: { nome: 'Categoria' },
            defaults: {
                nome: 'Categoria 1'
            }
        }
    )

    let [p]: [any, boolean] = await Produto.findOrCreat(
        {
            where: { nome: 'Produto 1'}
            defaults: {
                nome: ' Produto 1',
                valor: 100,
                categoriaId: cat.id
            }
        }
    )

    await Produto.findOrCreat(
        {
            where: { nome: 'Produto 2'}
            defaults: {
                nome: 'Produto 2',
                valor: 150,
                categoriaId: cat.id
            }
        }
    )

    await Produto.findOrCreat(
        {
            where: { nome: 'Produto 3'}
            default: {
                nome: 'Produto 3'
                valor: 150
            }
        }
    )

    // Eager loading


    // Lazy loading

}

setTimeout(() => {
    console.log('====testando associações =====')
    TestAssociations()
}, 2000)
   
