# 📱 NextGram – Rede Social com Next.js e Autenticação Google

**NextGram** é uma aplicação web que simula uma rede social inspirada no Instagram, desenvolvida com Next.js, TypeScript, Tailwind CSS, utilizando Prisma como ORM e SQLite como banco de dados. A autenticação é feita com a conta do Google via NextAuth.js.

## 📌 Funcionalidades

- **Feed de publicações:** Explore a home com postagens dos usuários, onde é possível curtir e comentar.
- **Perfil do usuário:** Visualize e edite o perfil, com opção de alterar a foto e o nome de usuário.
- **Área de publicação:** Publique novas imagens com legendas na home.
- **Aba de postagens:** Acesse uma seção com todas as suas publicações e a possibilidade de excluir posts específicos.

## 🛠 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** – Framework React para aplicações web.
- **[TypeScript](https://www.typescriptlang.org/)** – Linguagem com tipagem estática para maior segurança.
- **[Tailwind CSS](https://tailwindcss.com/)** – Framework CSS para estilização responsiva.
- **[Prisma](https://www.prisma.io/)** – ORM para gerenciamento do banco de dados.
- **[SQLite](https://sqlite.org/index.html)** – Banco de dados leve, armazenado localmente.
- **[NextAuth.js](https://next-auth.js.org/)** – Biblioteca de autenticação com suporte a provedores externos (Google).

## ⚙️ Instalação e uso local

1. Clone o repositório:

   ```bash
   git clone https://github.com/JosielJrr/nextgram-next-ts.git
   cd nextgram-next-ts
   ```

2. Configure as variáveis de ambiente:

   Use o comando abaixo para criar um arquivo `.env.local` com base no modelo:

   ```bash
   cp .env.example .env.local
   ```

   Em seguida, siga as instruções no próprio `.env.example` para obter as credenciais do **Google Cloud** e preencha o `.env.local`.

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute a aplicação:

   ```bash
   npm run dev
   ```

> Projeto desenvolvido no curso **Curso de Next.js do básico ao avançado com projetos** do [Hora de Codar](https://app.horadecodar.com.br/).
