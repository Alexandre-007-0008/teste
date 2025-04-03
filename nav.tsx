'use client'

import { useEffect } from "react"
import { useProduct } from "./Contexts/ProductContext"

export default function Nav() {
  const { produto } = useProduct()

  useEffect(() => {
    console.log('nav user', produto)
  }, [produto])

  return (
    <>
    <div className="top-bar">
      <div className="logo">Electronic's Place</div>
      <div className="user-area">
        <a href="/carrinho">
          <img className="button-img button-img2"/>
        </a>
        <a href="/login">
          <img className="button-img button-img1" />
        </a>
      </div>
    </div>
    <nav>
      <a href='/'>Início</a>
    </nav>

    
    <div className="bottom-bar">
        <div className="espaço">
          <a href="/fale-conosco">Fale conosco!</a>
          <a href="/fale-conosco">Divulgue sua marca no nosso site!</a>
        </div>
      </div>
    </>
  )
}
{/* 
      {user &&
        <>
          | <button onClick={logout}>Sair</button>
        </>
      }

      {user &&
          <p>Olá, usuário {user.id}</p>
      }
     */}