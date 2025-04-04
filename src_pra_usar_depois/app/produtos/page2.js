import Link from "next/link"

const PRODUTOS = [
  {
    name: 'string', slug: 'string'
  },
  {
    name: 'string', slug: 'string',
  }
]


export default function Dashboard() {
  return (
    <>
      <h1>Produtos</h1>

      <hr />

      <ul>
        {
          PRODUTOS.map((Produto, index) => {
            return (
              <li key={index}>
                <Link href={`/produtos/${PRODUTOS.slug}`}>{PRODUTOS.name}</Link>
              </li>
            )
          })
        }

      </ul>
    </>
  )
}
