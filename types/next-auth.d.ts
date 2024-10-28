import NextAuth from "next-auth"; // Importa o módulo NextAuth para estender os tipos

declare module "next-auth" {
    interface Session { // Estende a interface 'Session' do NextAuth
        user: {
            userId: string | undefined; // Adiciona um campo 'userId' para armazenar o ID do usuário, podendo ser 'undefined'
        } & DefaultSession["user"]; // Combina o novo campo com os atributos padrão de 'user' na sessão
    }
}
