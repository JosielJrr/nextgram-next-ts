"use client";

import { Post as PostType } from "types/Post"; // Importa o tipo Post para tipar o post recebido
import Image from "next/image";
import LikeButton from "./Post/LikeButton";
import { FiMessageSquare } from "react-icons/fi"; // Importa o ícone de mensagem para o botão de comentários
import CommentModal from "./Post/CommentModal";
import { useState } from "react";


interface PostProps {
    post: PostType; // O post que será exibido
    currentUserId?: string; // ID do usuário atual (opcional)
}


const Post = ({ post, currentUserId }: PostProps) => {
    let isLiked = false; // Variável para verificar se o post foi curtido pelo usuário atual

    // Verifica se o post possui likes e se o usuário atual está entre eles
    if (post.likes) {
        isLiked = post.likes.some((like) => like.userId === currentUserId);
    }

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // Estado para controlar a abertura do modal de comentários

    return (
        <div className="w-fit max-auto mb-6 p-4 border rounded shadow-sm">
            {/* Exibe a imagem do post */}
            <Image
                src={post.imageUrl}
                alt={`Imagem do Post`}
                className="w-[670px] h-[400px] object-cover mb-4 rounded"
                width={670}
                height={400}
            />
            {post.caption && ( // Exibe a legenda do post se existir
                <p className="mb-4 text-sm font-medium">
                    {post.caption}
                </p>
            )}

            <div className="flex items-center"> {/* Contêiner para a imagem do usuário e nome */}
                {/* Condicionalmente renderiza a imagem do usuário se existir */}
                {post.user.image && (
                    <Image
                        src={post.user.image}
                        alt={post.user.name || "Imagem do usuário"}
                        className="w-10 h-10 object-cover rounded-full mr-3"
                        width={40}
                        height={40}
                    />
                )}
                {/* Exibe o nome do usuário associado ao post */}
                <p className="text-sm font-medium">
                    {post.user.name}
                </p>
            </div>

            {/* Seção para ações (ex: curtir, comentar) */}
            <div className="flex items-center mt-4">
                <LikeButton
                    postId={post.id} // ID do post
                    initialLikesCount={post.likes?.length ? post.likes.length : 0} // Contagem inicial de likes
                    isLiked={isLiked} // Indica se o post foi curtido pelo usuário atual
                    currentUserId={currentUserId} // ID do usuário atual
                />
                <button
                    className="ml-4 flex items-center" // Botão para abrir o modal de comentários
                    onClick={() => setIsCommentModalOpen(true)} // Abre o modal ao clicar
                >
                    <FiMessageSquare className="w-6 h-6 text-gray-500" /> {/* Ícone de mensagem */}
                    <span className="ml-1">
                        {post.comments ? post.comments.length : 0} {/* Exibe a contagem de comentários */}
                    </span>
                </button>
            </div>
            {/* Componente Modal de Comentários */}
            <CommentModal
                post={post} // O post para o qual os comentários estão sendo feitos
                currentUserId={currentUserId} // ID do usuário atual
                isOpen={isCommentModalOpen} // Controla a visibilidade do modal
                onRequestClose={() => setIsCommentModalOpen(false)} // Função chamada para fechar o modal
            />
        </div>
    );
};

export default Post;
