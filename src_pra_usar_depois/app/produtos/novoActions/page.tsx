import { cadastrarProduto } from '@/app/lib/actions'

export default function Pagina() {
    return (
        <>
            <h1>Cadastrar novo produto</h1>

            <form action={cadastrarProduto}>
                <div>
                    <label htmlFor='nome'>Nome do produto</label>
                    <input
                        id='nome'
                        name='nome'
                        type='text'
                        autoFocus={true}
                    />

                    <label htmlFor='valor'>Valor do produto</label>
                    <input
                        id='valor'
                        name='valor'
                        type='number'
                    />

                    <label htmlFor='estoque'>Estoque do produto</label>
                    <input
                        id='estoque'
                        name='estoque'
                        type='number'
                    />
                </div>

                <button>Salvar</button>

            </form>
        </>
    )
}