import type { NextAuthConfig } from "next-auth"; // Importa o tipo de configuração do NextAuth
import NextAuth from "next-auth"; // Importa o NextAuth para configurar a autenticação
import google from "next-auth/providers/google"; // Importa o provedor de autenticação do Google
import { PrismaAdapter } from "@auth/prisma-adapter"; // Importa o adaptador Prisma para gerenciar sessões
import { PrismaClient } from "@prisma/client"; // Importa o cliente Prisma para interagir com o banco de dados

const prisma = new PrismaClient(); // Cria uma instância do cliente Prisma

const config = {
    adapter: PrismaAdapter(prisma), // Configura o adaptador Prisma para gerenciar a autenticação
    session: { strategy: "jwt" }, // Define a estratégia de sessão como JWT (JSON Web Token)
    providers: [google], // Adiciona o provedor do Google à configuração de autenticação
    callbacks: {
        session({ session, token }) { // Callback para manipular a sessão antes de ser retornada
            // Adiciona o ID do usuário à sessão
            if (token.sub) session.user.userId = token.sub; // Se o token tiver um ID, atribui à sessão
            return session; // Retorna a sessão modificada
        },
    },
    pages: {
        signIn: "/signin", // Define a página de login personalizada
    },
} satisfies NextAuthConfig; // Verifica se a configuração está conforme o tipo da interface NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config); // Exporta os manipuladores de autenticação e métodos

// Define o tipo do provedor
interface ProviderWithId {
    id: string; // ID do provedor
    name: string; // Nome do provedor
}

// Mapeando os provedores manualmente
export const providerMap = config.providers.map((provider) => {
    const typedProvider = provider as unknown as ProviderWithId; // Tipagem do provedor para incluir ID e nome
    return { id: typedProvider.id, name: typedProvider.name }; // Retorna um novo objeto com ID e nome
});
