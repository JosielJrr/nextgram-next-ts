# NextGram
**NextGram** é uma aplicação web que simula uma rede social inspirada no Instagram, desenvolvida com [Next.js](https://nextjs.org/docs), [TypeScript](https://www.typescriptlang.org/docs/), [Tailwind CSS](https://tailwindcss.com/docs), e utilizando [Prisma](https://www.prisma.io/docs) como ORM e [SQLite](https://sqlite.org/docs.html) como banco de dados. O usuário pode se autenticar com sua conta do Google, através do [NextAuth.js](https://next-auth.js.org/getting-started/introduction), para acessar a plataforma e interagir com diversas funcionalidades.


## Funcionalidades 
- **Feed de publicações:** Explore a home com postagens dos usuários, onde é possível curtir e comentar.
- **Perfil do usuário:** Visualize e edite o perfil, com opção de alterar a foto e o nome de usuário.
- **Área de publicação:** Publique novas imagens e legendas na home, escolhendo um arquivo de imagem.
- **Aba de postagens:** Acesse uma seção com todas as suas publicações e a possibilidade de excluir posts específicos.

## Instalação e Configuração
Para rodar a aplicação localmente, siga os passos abaixo:
1. **Clone o repositório:**
    ```bash
    git clone https://github.com/JosielJrr/nextgram-next-ts.git
    ```
2. **Configuração do Ambiente com Prisma:** Siga os passos abaixo para configurar seu ambiente de desenvolvimento:
- Crie um arquivo chamado `.env.local` na raiz do projeto.
- Adicione as variáveis de ambiente abaixo. Lembre-se de substituir pelos seus próprios valores após registrar a aplicação no **Google Console**:

   ```plaintext
   AUTH_GOOGLE_ID="Seu_ID_do_Cliente_do_Google"  
   AUTH_GOOGLE_SECRET="Seu_Segredo_do_Cliente_do_Google"  
   AUTH_SECRET="Sua_Chave_para_Proteger_Sessões"  
 

3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
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
