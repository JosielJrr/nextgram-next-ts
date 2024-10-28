"use server";

import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient para manipular o banco de dados
import { User } from "@prisma/client"; // Importa o tipo User para definir o retorno da função
import { auth } from "auth"; // Importa a função de autenticação
import { redirect } from "next/navigation"; // Importa a função para redirecionar o usuário

import path from "path"; // Importa o módulo path para manipulação de caminhos de arquivos
import { promises as fs } from "fs"; // Importa as promessas do módulo fs para manipulação de arquivos
import { revalidatePath } from "next/cache"; // Importa a função para revalidar caminhos em cache

const prisma = new PrismaClient(); // Inicializa uma instância do PrismaClient para acesso ao banco de dados


// Define o tipo FormState para as mensagens de feedback da atualização
type FormState = {
    message: string; // Mensagem de feedback
    type: string; // Tipo da mensagem (ex: success, error)
}


// Busca um usuário por email
export const getUserByEmail = async (email: string | null): Promise<User | null> => {
    if (!email) return null; // Retorna null se o email for nulo

    // Busca o primeiro usuário no banco de dados que corresponda ao email fornecido
    const user = await prisma.user.findFirst({
        where: { email: email } // Condição de busca
    });

    return user; // Retorna o usuário encontrado ou null se não houver correspondência
};


// Faz upload de uma imagem e retorna sua URL
const uploadImage = async (imageFile: File): Promise<string> => {
    const uploadDir = path.join(process.cwd(), "public", "uploads"); // Cria caminho de diretórios onde as imagens serão armazenadas (/public/uploads)
    await fs.mkdir(uploadDir, { recursive: true }); // Cria o diretório se não existir
    const filePath = path.join(uploadDir, imageFile.name); // Caminho completo do arquivo de imagem
    const arrayBuffer = await imageFile.arrayBuffer(); // Converte o arquivo de imagem em um ArrayBuffer (representação de dados binários)
    await fs.writeFile(filePath, Buffer.from(arrayBuffer)); // Grava o conteúdo do ArrayBuffer no sistema de arquivos na localização especificada por filePath.
    return `/uploads/${imageFile.name}`; // Retorna a URL da imagem armazenada
};


// Verifica a autorização do usuário
const checkUserAuthorization = async (userId: string) => {
    const session = await auth(); // Verifica se o usuário está autenticado

    if (!session) redirect("/"); // Redireciona para a página inicial se não houver uma sessão ativa

    // Confere se o usuário autenticado é o mesmo que está tentando realizar a ação
    if (session.user.userId !== userId) {
        throw new Error("Não autorizado!");
    }

    return session;
};


// Atualiza o perfil do usuário
export const updateUserProfile = async (formState: FormState, formData: FormData): Promise<FormState> => {
    const session = await auth(); // Verifica a sessão do usuário autenticado

    if (!session) redirect("/"); // Redireciona para a página inicial se não houver sessão

    const id = formData.get("id") as string; // Obtém o ID do usuário do FormData
    const name = formData.get("name") as string; // Obtém o nome do usuário do FormData
    const imageFile = formData.get("image") as File; // Obtém o arquivo da imagem do FormData

    // Verifica se o nome é menor que 5 caracteres e retorna uma mensagem de erro 
    if (name.length < 3) {
        return { message: "O nome precisa ter 3 caracteres!", type: "error" };
    }

    // Verifica se o ID do usuário na sessão corresponde ao ID fornecido, caso contrário, lança um erro
    if (session.user.userId !== id) {
        throw new Error("Não autorizado!");
    }

    let imageUrl;
    if (imageFile && imageFile.name !== "undefined") {
        imageUrl = await uploadImage(imageFile); // Chama a função para fazer upload da imagem
    }

    // Define os dados a serem atualizados; inclui a imagem se fornecida
    const dataToUpdate = imageFile ? { name, image: imageUrl } : { name };

    // Atualiza o usuário no banco de dados
    await prisma.user.update({
        where: { id }, // Condição para encontrar o usuário
        data: dataToUpdate, // Dados a serem atualizados
    });

    revalidatePath("/profile"); // Revalida a página do perfil para garantir que as alterações sejam refletidas em cache

    // Retorna uma mensagem de sucesso após a atualização do perfil
    return { message: "Perfil atualizado com sucesso!", type: "success" };
};


// Cria um novo Post
export const createPost = async (formState: FormState, formData: FormData): Promise<FormState> => {
    const session = await auth(); // Verifica a sessão do usuário autenticado

    if (!session) redirect("/"); // Redireciona para a página inicial se o usuário não estiver autenticado

    const caption = formData.get("caption") as string; // Obtém o conteúdo da legenda a partir do FormData
    const imageFile = formData.get("image") as File; // Obtém o arquivo de imagem a partir do FormData

    // Validação: verifica se a legenda e o arquivo de imagem estão presentes
    if (!caption || imageFile.size === 0) {
        return { message: "Legenda e foto são obrigatórios", type: "error" };
    }

    const imageUrl = await uploadImage(imageFile); // Chama a função para fazer upload da imagem

    // Insere um novo post no banco de dados utilizando o Prisma
    await prisma.post.create({
        data: {
            imageUrl, // URL da imagem armazenada
            caption, // Legenda do post
            userId: session.user.userId, // ID do usuário autenticado
        },
    });

    revalidatePath("/"); // Revalida o cache para garantir que o novo post apareça na página inicial

    redirect("/"); // Redireciona o usuário para a página inicial após criar o post
};


// Resgata os Posts de um usuário
export const getUserPosts = async (userId: string) => {

    await checkUserAuthorization(userId); // Verifica a autorização do usuário

    // Retorna todos os posts do usuário, incluindo dados do usuário, likes e comentários
    return await prisma.post.findMany({
        where: { userId }, // Busca os posts pelo userId fornecido
        include: {
            user: true, // Inclui os dados do usuário associado ao post
            likes: true, // Inclui os likes associados ao post
            comments: true, // Inclui os comentários associados ao post
        },
        orderBy: {
            createdAt: "desc", // Ordena os posts por data de criação em ordem decrescente (posts mais recentes primeiro)
        },
    });
};


// Deleta Posts de um usuário
export const deletePost = async (formData: FormData) => {
    const userId = formData.get("userId") as string; // Obtém o ID do usuário 
    const postId = formData.get("postId") as string; // Obtém o ID do post 

    await checkUserAuthorization(userId); // Verifica a autorização do usuário

    // Exclui o post do banco de dados com base no ID do post fornecido
    await prisma.post.delete({
        where: { id: postId },
    });

    revalidatePath("/my-posts") // Revalida o cache da página de posts do usuário para refletir a exclusão

    redirect("/my-posts") // Redireciona o usuário de volta para a página dos posts
};


// Recupera todos os posts com informações adicionais
export const getAllPosts = async () => {

    // Retorna todos os posts do usuário
    return await prisma.post.findMany({
        include: {
            user: true, // Inclui os dados do usuário associado a cada post
            likes: true, // Inclui as curtidas associadas ao post
            comments: {
                include: {
                    user: true // Inclui os dados do usuário para cada comentário
                }
            },
        },
        orderBy: {
            createdAt: "desc", // Ordena os posts pela data de criação em ordem decrescente
        },
    });
};


// Like no Post
export const likePost = async (postId: string, userId: string) => {

    await checkUserAuthorization(userId); // Verifica a autorização do usuário

    // Verifica se o usuário já curtiu o post
    const existingLike = await prisma.like.findFirst({
        where: {
            postId,
            userId,
        },
    });

    if (existingLike) {
        // Se já existe uma curtida do usuário, a remove
        await prisma.like.delete({
            where: {
                id: existingLike.id, // Usa o ID da curtida existente para removê-la
            },
        });
    } else {
        // Se não existe uma curtida, cria uma nova curtida associada ao post e ao usuário
        await prisma.like.create({
            data: {
                postId, // ID do post curtido
                userId, // ID do usuário que curtiu
            },
        });
    }

    revalidatePath("/"); // Revalida a página inicial para atualizar o estado de curtidas
};


// Comenta o post
export const addComment = async (postId: string, userId: string, content: string) => {

    await checkUserAuthorization(userId); // Verifica a autorização do usuário

    // Cria um novo comentário associado ao post e ao usuário autenticado
    await prisma.comment.create({
        data: {
            postId,    // ID do post que está recebendo o comentário
            userId,    // ID do usuário que fez o comentário
            content,   // Conteúdo do comentário fornecido
        },
    });

    revalidatePath("/"); // Revalida a página inicial para atualizar o estado dos comentários
};


