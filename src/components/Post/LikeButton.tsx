"use client"; 

import { likePost } from "@/actions"; 
import { useRouter } from "next/navigation"; 
import { useState } from "react"; 
import { BsFillHeartFill, BsHeart } from "react-icons/bs"; // Importa ícones de coração para representar curtidas


interface LikeButtonProps {
    postId: string; // ID do post a ser curtido/descurtido
    initialLikesCount: number; // Contagem inicial de curtidas do post
    isLiked: boolean; // Indica se o post está inicialmente curtido pelo usuário atual
    currentUserId?: string; // ID do usuário atualmente logado (opcional)
}

const LikeButton = ({ postId, initialLikesCount, isLiked, currentUserId }: LikeButtonProps) => {
    const [likesCount, setLikesCount] = useState(initialLikesCount); // Armazena o número atual de curtidas
    const [liked, setLiked] = useState(isLiked); // Armazena se o post está curtido pelo usuário atual

    const router = useRouter(); 

    // Função que lida com a ação de curtir/descurtir um post
    const handleLike = async () => {
        if (!currentUserId) { 
            router.push("/signin"); // Redireciona o usuário para a página de login se não estiver autenticado
            return; // Encerra a execução da função caso o usuário não esteja logado
        }

        await likePost(postId, currentUserId); // Executa a função de curtir/descurtir post

        // Atualiza os estados para refletir a nova situação de curtida
        setLiked(!liked); // Alterna o estado de curtida
        setLikesCount(liked ? likesCount - 1 : likesCount + 1); // Ajusta a contagem de curtidas com base no novo estado
    };

    return (
        <div className="flex items-center">
            <button onClick={handleLike} className="mr-2">
                {liked ? (
                    <BsFillHeartFill className="w-6 h-6 text-red-500" /> // Exibe um coração cheio (vermelho) se o post está curtido
                ) : (
                    <BsHeart className="w-6 h-6 text-gray-500" /> // Exibe um coração vazio (cinza) se o post não está curtido
                )}
            </button>
            <span>{likesCount}</span> {/* Exibe a contagem atual de curtidas */}
        </div>
    );
};


export default LikeButton;
