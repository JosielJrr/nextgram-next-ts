import { User } from "./User";
import { Like } from "./Like";
import { Comment } from "./Comment";

export interface Post {
    id: string;               // ID único do post
    imageUrl: string;         // URL da imagem associada ao post
    caption?: string | null;  // Legenda do post, opcional e pode ser nula
    userId: string;           // ID do usuário que criou o post
    createdAt: Date;          // Data e hora em que o post foi criado
    updatedAt: Date;          // Data e hora da última atualização do post
    user: User;               // Dados completos do usuário que criou o post
    likes?: Like[] | [];      // Lista de "likes" no post, opcional
    comments?: Comment[] | [];// Lista de comentários no post, opcional
}
