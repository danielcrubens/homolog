import { useCompiler } from '#vue-email'
import { Resend } from 'resend'
   
// Inicializa o Resend com a chave API do ambiente
const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {
  try {
    // Recebe os dados do corpo da requisição
    const { email, name } = await readBody(event)
    console.log('Tentando compilar o template Welcome.vue no diretório:', 'emails/Teste.vue');

    // Compila o template Vue com as props necessárias
    const template = await useCompiler('Teste.vue', {
      props: {
        name,
        email
      }
    })
    if (!template) {
      throw new Error('Template compilation failed')
    }
    // Configura as opções do email
    const emailOptions = {
      from: 'Mapeamento Necessidades <contato@danielcrubens.dev>',
      to: [email],
      subject: 'Confirmação de Mapeamento',
      html: template.html,
    }

    // Envia o email usando o Resend 
    const data = await resend.emails.send(emailOptions)

    return {
      success: true,
      data
    }

  } catch (error) {
    console.error('Erro ao enviar email:', error)
    
    return {
      success: false,
      error: error.message
    }
  }
})        