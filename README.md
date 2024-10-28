# NextGram
NextGram é uma aplicação web que simula uma rede social inspirada no Instagram, desenvolvida com Next.js, TypeScript, Tailwind CSS, e utilizando Prisma como ORM e SQLite como banco de dados. O usuário pode se autenticar com sua conta do Google, através do NextAuth.js, para acessar a plataforma e interagir com diversas funcionalidades.

## Funcionalidades 
- **Feed de publicações:** Explore a home com postagens dos usuários, onde é possível curtir e comentar.
- **Perfil do usuário:** Visualize e edite o perfil, com opção de alterar a foto e o nome de usuário.
- **Área de publicação:** Publique novas imagens e legendas na home, escolhendo um arquivo de imagem.
- **Aba de postagens:** Acesse uma seção com todas as suas publicações e a possibilidade de excluir posts específicos.

## Instalação
Para rodar a aplicação localmente, siga os passos abaixo:
1. Clone o repositório:
    ```bash
    git clone https://github.com/JosielJrr/nextgram-next-ts.git
    ```
2. Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```
3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Comandos Disponíveis
Aqui estão os comandos disponíveis para gerenciar a aplicação:
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Constrói a aplicação para produção.
- `npm run start`: Executa a versão de produção da aplicação.

## Tecnologias Utilizadas
- **Next.js:** Estrutura da aplicação e renderização.
- **TypeScript:** Tipagem estática para maior segurança.
- **Tailwind CSS:** Estilização rápida e responsiva.
- **Prisma:** ORM para acessar o banco de dados.
- **SQLite:** Banco de dados leve e incorporado.
- **NextAuth.js:** Autenticação com provedores externos (Google).

## Sobre o Projeto
Este projeto foi desenvolvido no curso **Curso de Next.js do básico ao avançado com projetos** do [Hora de Codar](https://app.horadecodar.com.br/).
