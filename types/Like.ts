import { User } from "./User";
import { Post } from "./Post";

export interface Like {
    id: string;           // ID único do "like"
    userId: string;       // ID do usuário que deu o "like"
    postId: string;       // ID do post que recebeu o "like"
    createdAt: Date;      // Data e hora em que o "like" foi dado
    user?: User;          // Dados completos do usuário que deu o "like", opcional
    post?: Post;          // Dados do post que recebeu o "like", opcional
}
