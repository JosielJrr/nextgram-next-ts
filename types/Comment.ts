import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
    id: string;           // ID único do comentário
    userId: string;       // ID do usuário que fez o comentário
    postId: string;       // ID do post ao qual o comentário pertence
    content: string;      // Conteúdo do comentário
    createdAt: Date;      // Data e hora em que o comentário foi criado
    updatedAt: Date;      // Data e hora da última atualização do comentário
    user: User;           // Dados completos do usuário que fez o comentário
    post?: Post;          // Dados do post ao qual o comentário pertence, opcional
}
