import { Like } from "./Like";
import { Post } from "./Post";

export interface User {
    id: string;               // ID único do usuário
    name: string | null;      // Nome do usuário, pode ser nulo
    email: string | null;     // Email do usuário, pode ser nulo
    emailVerified: Date | null; // Data de verificação do email, pode ser nula
    image: string | null;     // URL da imagem de perfil do usuário, pode ser nula
    createdAt: Date;          // Data de criação do perfil do usuário
    updatedAt: Date;          // Data da última atualização do perfil do usuário
    posts?: Post[];           // Lista de posts criados pelo usuário, opcional
    likes?: Like[];           // Lista de "likes" dados pelo usuário, opcional
    comments?: Comment[];     // Lista de comentários feitos pelo usuário, opcional
}
