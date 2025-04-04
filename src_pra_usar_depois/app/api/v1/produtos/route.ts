export const PRODUTOS = [
    {
      id: 1, qtde: 20, name: 'LED', slug: 'led', img: "/imagens/produto1.png", valor: 0.30,
    },  
    {
      id: 2, qtde: 15, name: 'Multímetro', slug: 'multímetro', img: "/imagens/produto2.png", valor: 78.99,
    },
    {
      id: 3, qtde: 10, name: 'Osciloscópio ', slug: 'osciloscópio ',  img: "/imagens/produto3.png", valor: 968,
    },
    {
      id: 4, qtde: 5, name: 'Micro:Bit', slug: 'micro:bit',  img: "/imagens/produto4.png", valor: 322,
    }, //o id deveria ser "_id"?
    {
      id: 5, qtde: 25, name: 'Resistor', slug: 'resitor',  img: "/imagens/produto5.png", valor: 0.25,
    },
    {
      id: 6, qtde: 10, name: 'Gerador de Funções', slug: 'gerador de funções',  img: "/imagens/produto6.png", valor: 1000,
    } 
  ]
   //aqui implementar as requisições http
  export async function GET() {
    return Response.json(PRODUTOS)
  }

  export async function POST() {
    return Response.json(PRODUTOS)
  }

  export async function PUT() {
    return Response.json(PRODUTOS)
  }
  
  export async function DELETE() {
    return Response.json(PRODUTOS)
  }
  
  
  