"use client";

import { useState } from "react";
import Modal from "react-modal"; // Importa o componente Modal para exibir diálogos
import { Post as PostType } from "types/Post"; // Importa o tipo Post para tipar o post recebido
import Button from "../Button";
import FlashMessage from "../FlashMessage";
import { addComment } from "@/actions";
import { GrClose } from "react-icons/gr"; // Importa o ícone de fechar
import Image from "next/image";


interface CommentModalProps {
    post: PostType; // O post ao qual os comentários estão associados
    currentUserId?: string; // ID do usuário atualmente logado (opcional)
    isOpen: boolean; // Indica se o modal está aberto ou fechado
    onRequestClose: () => void; // Função para fechar o modal
}

const CommentModal = ({ post, currentUserId, isOpen, onRequestClose }: CommentModalProps) => {
    const [content, setContent] = useState(""); // Estado para armazenar o conteúdo do comentário ao ser adicionado
    const [flashMessage, setFlashMessage] = useState<{
        message: string; // Mensagem a ser exibida na FlashMessage
        type: "error" | "success"; // Tipo da mensagem (erro ou sucesso)
    } | null>(null); // Estado para gerenciar mensagens flash, iniciando como null


    // Função que lida com a adição de um novo comentário
    const handleAddComment = async () => {
        if (!currentUserId) {
            window.location.href = "/"; // Redireciona para a página inicial se não estiver autenticado
            return; // Encerra a execução da função
        }

        // Verifica se o conteúdo do comentário não está vazio
        if (!content.trim()) {
            setFlashMessage({
                message: "O comentário não pode estar vazio", // Mensagem de erro se o comentário estiver vazio
                type: "error", // Tipo de mensagem
            });
            return; // Encerra a execução da função
        }

        // Chama a função para adicionar o comentário
        await addComment(post.id, currentUserId, content);

        // Atualiza a mensagem de flash para indicar sucesso
        setFlashMessage({
            message: "Comentário adicionado com sucesso!", // Mensagem de sucesso
            type: "success", // Tipo de mensagem
        });

        setContent(""); // Limpa o conteúdo do campo de comentário
    };



    return (
        <Modal
            isOpen={isOpen} // Controla a visibilidade do modal
            onRequestClose={onRequestClose} // Função chamada ao tentar fechar o modal
            contentLabel="Comentários" // Rótulo para acessibilidade
            ariaHideApp={false} // Para permitir que o modal seja acessível
            className="w-[704px] mt-28 mx-auto bg-white rounded border border-zinc-300"
        >

            {/* Contêiner para o conteúdo do modal */}
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold mb-4">Comentários</h2>
                    <button
                        className="bg-red-600 hover:bg-red-400 text-white p-2 rounded-full" // Botão para fechar o modal
                        onClick={onRequestClose} // Chamado ao clicar para fechar
                    >
                        <GrClose /> {/* Ícone de fechar */}
                    </button>
                </div>

                {flashMessage && ( // Verifica se há uma mensagem de flash a ser exibida
                    <FlashMessage message={flashMessage.message} type={flashMessage.type} />
                )}

                {/* Contêiner para comentários existentes */}
                <div className="mb-4 flex flex-col">
                    {post.comments && post.comments.length > 0 ? ( // Verifica se há comentários
                        post.comments.map((comment) => ( // Mapeia os comentários para renderizá-los
                            <div className="flex items-center mb-4" key={comment.id}> {/* Contêiner para cada comentário */}
                                {comment.user.image && ( // Verifica se o usuário possui imagem
                                    <Image
                                        src={comment.user.image} // Imagem do usuário
                                        alt={`Imagem do usuário ${comment.user.name}`}
                                        className="w-10 h-10 object-cover rounded-full mr-3"
                                        width={40}
                                        height={40}
                                    />
                                )}
                                <p className="text-sm"> {/* Exibe o conteúdo do comentário */}
                                    <strong>{comment.user.name}</strong> {comment.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm">Nenhum comentário ainda</p> // Mensagem se não houver comentários
                    )}
                </div>
                {currentUserId && ( // Verifica se o usuário está autenticado para permitir comentários
                    <div className="mb-4 flex-col gap-6"> {/* Contêiner para o formulário de comentário */}
                        <textarea
                            className="w-full h-32 p-2 border border-zinc-300 rounded text-sm font-medium"
                            value={content} // Valor do campo de texto
                            onChange={(e) => setContent(e.target.value)} // Atualiza o estado content ao digitar
                            placeholder="Adicione um comentário..."
                        >
                        </textarea>
                        <div className="flex justify-end">
                            <Button type="button" text="Comentar" onClick={handleAddComment} /> {/* Botão para adicionar o comentário */}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};


export default CommentModal;
