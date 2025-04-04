

'use client'
import { FormEvent } from 'react'
import { useUser } from '../Contexts/UserContext'
import "../globals.css"
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Pagina() {
  const { login } = useUser() || {}
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita reload da página

    const formData = new FormData(event.currentTarget)
    const loginUsuario = formData.get('login') as string
    const senhaUsuario = formData.get('senha') as string

    if (!loginUsuario || !senhaUsuario) {
      alert("Preencha todos os campos")
      return
    }

    try {
      if (!login) {
        console.error("Erro: função login não encontrada.")
        return
      }

      await login(loginUsuario, senhaUsuario)

      // Teste também com NextAuth:
      const result = await signIn("credentials", {
        redirect: false,
        login: loginUsuario,
        password: senhaUsuario
      })

      if (result?.error) {
        console.log("Erro de login:", result.error)
        alert("Usuário inválido")
        return
      }

      // **NOVO: Enviar os dados para o backend**
      const response = await fetch("/api/v1/login", { // Alterar para 'register' se for para criação de usuário
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginUsuario, senha: senhaUsuario }) // Certifique-se de que esses campos estão corretos
      })

      if (!response.ok) {
        const errorData = await response.json() // Pega a resposta de erro do backend
        throw new Error(errorData.message || "Erro ao autenticar no backend.")
      }

      const data = await response.json()
      localStorage.setItem("token", data.token) // Salva o token para futuras requisições

      router.push("/pedidos") // Redireciona para a página de pedidos após login bem-sucedido

    } catch (e) {
      console.log("Erro de login", e)
      alert("Erro ao tentar fazer login.")
    }
  }

  return (
    <>
      <div className="top-bar">
        <div className="logo">Electronic's Place</div>
        <div className="user-area">
          <a href="/carrinho">
            <img className="button-img button-img2" />
          </a>
          <a href="/login">
            <img className="button-img button-img1" />
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="form">
        <div id="login-container">
          <h2 className="h3 mb-3 fw-normal text-center">Please sign in</h2>

          <div className="form-floating mb-2">
            <input type="email" name="login" className="form-control" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" name="senha" className="form-control" id="floatingPassword" placeholder="" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="tamanho">
            <Link href='/auth/recuperar_senha'>Recuperar senha</Link>
            <hr />
            <Link href='/auth/nova_senha'>Nova Senha</Link>
          </div>
          <hr />
          <p>Ou</p>

          <button type="button" onClick={() => signIn("google", { redirectTo: "/" })}>Faça login com o Google</button>
          <br />
          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </div>
      </form>
    </>
  )
}

// 'use client'
// import { FormEvent } from 'react'
// import { useUser } from '../Contexts/UserContext'
// import "../globals.css"
// import { signIn } from "next-auth/react"
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// export default function Pagina() {
//   const { login } = useUser() || {}
//   const router = useRouter()

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault() // Evita reload da página

//     const formData = new FormData(event.currentTarget)
//     const loginUsuario = formData.get('login') as string
//     const senhaUsuario = formData.get('senha') as string

//     if (!loginUsuario || !senhaUsuario) {
//       alert("Preencha todos os campos")
//       return
//     }

//     try {
//       if (!login) {
//         console.error("Erro: função login não encontrada.")
//         return
//       }

//       await login(loginUsuario, senhaUsuario)

//       // Teste também com NextAuth:
//       const result = await signIn("credentials", {
//         redirect: false,
//         login: loginUsuario,
//         password: senhaUsuario
//       })

//       if (result?.error) {
//         console.log("Erro de login:", result.error)
//         alert("Usuário inválido")
//         return
//       }

//       // **NOVO: Enviar os dados para o backend**
//       const response = await fetch("/app/api/v1/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: loginUsuario, senha: senhaUsuario })
//       })

//       if (!response.ok) {
//         throw new Error("Erro ao autenticar no backend.")
//       }

//       const data = await response.json()
//       localStorage.setItem("token", data.token) // Salva o token para futuras requisições

//       router.push("/") //Deveria redirecionar corretamente, mas como não funcionou ainda tá indo pra página inicial. Redireciona para a página de pedidos após login bem-sucedido

//     } catch (e) {
//       console.log("Erro de login", e)
//       alert("Erro ao tentar fazer login.")
//     }
//   }

//   return (
//     <>
//       <div className="top-bar">
//         <div className="logo">Electronic's Place</div>
//         <div className="user-area">
//           <a href="/carrinho">
//             <img className="button-img button-img2" />
//           </a>
//           <a href="/login">
//             <img className="button-img button-img1" />
//           </a>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} id="form">
//         <div id="login-container">
//           <h2 className="h3 mb-3 fw-normal text-center">Please sign in</h2>

//           <div className="form-floating mb-2">
//             <input type="email" name="login" className="form-control" id="floatingInput" placeholder="" />
//             <label htmlFor="floatingInput">Email address</label>
//           </div>

//           <div className="form-floating mb-2">
//             <input type="password" name="senha" className="form-control" id="floatingPassword" placeholder="" />
//             <label htmlFor="floatingPassword">Password</label>
//           </div>

//           <div className="tamanho">
//             <Link href='/auth/recuperar_senha'>Recuperar senha</Link>
//             <hr />
//             <Link href='/auth/nova_senha'>Nova Senha</Link>
//           </div>
//           <hr />
//           <p>Ou</p>

//           <button type="button" onClick={() => signIn("google", { redirectTo: "/" })}>Faça login com o Google</button>
//           <br />
//           <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
//         </div>
//       </form>
//     </>
//   )
// }
