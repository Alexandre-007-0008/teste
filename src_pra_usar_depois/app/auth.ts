// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"

// import jwt from 'jsonwebtoken'
// import Usuario from '@/app/db/models/usuario'
// import { cookies } from 'next/headers'

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google({
//         clientId: process.env.AUTH_GOOGLE_ID,
//         clientSecret: process.env.AUTH_GOOGLE_SECRET
//         authorization: {
//             params: {
//                 prompt: "consent",
//                 access_type: "offline",
//                 response_type: "code",
//                 scope: 'profile email'
//             }
//         }
//     })
//   ],
//   callbacks: {
//     async signIn({ account, profile }: any) {
//         console.log('callback signIn account', account)
//         console.log('callback signIn profile', profile)

//         const emailGoogle = profile.email
//         const user = await Usuario.findOne({ email: emailGoogle })
//         console.log("user", user)
//         if(user) {
//             const tokenJwt = jwt.sign(
//                                         {
//                                             user: {
//                                                 id: user._id, //1
//                                                 login: user.login, //name
//                                                 email: user.email //xande@teste.com.br
//                                             }
//                                         }, 
//                                         process.env.JWT_SECRET!,
//                                         { expiresIn: '1h' }
//                                     );
            
//             (await cookies()).set('session', tokenJwt)
//         } else {
//             (await cookies()).delete('session')
//         }

//         return true // Do different verification for other providers that don't have `email_verified`
//     },
//     jwt({ token, user }) {
//         console.log("callback jwt token", token)
//         console.log("callback jwt user", user)

//         // Cookies.set("teste_jwt", "teste")

//         return token
//     },
//     session({ session, token }) {
//         console.log("callback session session", session)
//         console.log("callback session token", token)
//         // session.user.id = token.id
//         return session
//     },
//   }
// })

//  import NextAuth from "next-auth"

