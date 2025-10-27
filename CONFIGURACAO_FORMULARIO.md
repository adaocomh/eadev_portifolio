# 🚀 Configuração do Formulário de Contato

Este documento explica como configurar o formulário de contato para funcionar quando hospedado.

## ⚠️ Problema Comum

Se o formulário não está funcionando quando hospedado, é porque as **variáveis de ambiente** não estão configuradas corretamente na sua plataforma de hospedagem.

## 📝 Variáveis Necessárias

Você precisa configurar estas 3 variáveis de ambiente na plataforma onde hospeda seu site (Vercel, Netlify, etc.):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

## 🔧 Como Obter as Credenciais do EmailJS

1. Acesse [https://www.emailjs.com](https://www.emailjs.com)
2. Crie uma conta ou faça login
3. No dashboard:
   - **Service ID**: Vá em "Email Services" e copie o Service ID
   - **Template ID**: Vá em "Email Templates" e copie o Template ID
   - **Public Key**: Vá em "Account" > "General" e copie a Public Key

## 🌐 Configuração na Plataforma de Hospedagem

### Vercel:
1. Vá em seu projeto no Vercel
2. Settings → Environment Variables
3. Adicione as 3 variáveis com os prefixos `NEXT_PUBLIC_`
4. Depois de adicionar, faça um novo deploy

### Netlify:
1. Vá em Site Settings → Environment Variables
2. Adicione as 3 variáveis com os prefixos `NEXT_PUBLIC_`
3. Vá em Deploys e faça "Clear cache and retry deploy"

### Outras Plataformas:
Procure por "Environment Variables" ou "Variáveis de Ambiente" nas configurações do seu projeto.

## ✅ Configuração Adicional Importante

### 1. Adicionar Domínio no EmailJS

No painel do EmailJS, você precisa adicionar seu domínio como autorizado:
- Vá em "Account" → "General" → "Allowed origins"
- Adicione seu domínio (ex: `https://www.eadaodev.com`)

### 2. Verificar o Template do Email

Certifique-se de que seu template no EmailJS tem os campos corretos:
- `{{name}}` - Nome
- `{{email}}` - Email
- `{{message}}` - Mensagem

## 🐛 Verificação de Erros

Com as melhorias implementadas, o formulário agora mostra mensagens específicas:

- **Erro 400**: Dados inválidos
- **Erro 401**: Problema de autenticação (credenciais inválidas)
- **Erro 429**: Muitas tentativas (rate limit)
- **Sem conexão**: Internet não disponível

## 📧 Contato Alternativo

Caso o formulário não funcione, os usuários podem:
- WhatsApp: +55 (48) 98422-9769
- Email: eadevcontato@gmail.com

## 🔄 Após Configurar

1. Salve as variáveis de ambiente
2. Faça um novo deploy do site
3. Teste o formulário
4. Verifique o console do navegador (F12) se houver erros

