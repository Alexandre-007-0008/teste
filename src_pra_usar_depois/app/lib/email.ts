import nodemailer from 'nodemailer'

// https://www.wpoven.com/tools/free-smtp-server-for-testing
const transporter = nodemailer.createTransport({
  host: 'smtp.freesmtpservers.com',
  port: 25
})

export const enviarEmail = async (destinatario: string, assunto: string, texto: string, html: string) => {
    const info = await transporter.sendMail({
        from: '"Teste 👻" <xande@teste.com.br>',
        to: destinatario,
        subject: assunto,
        text: texto,
        html: html
    })
    console.log("E-mail enviado", info)
}