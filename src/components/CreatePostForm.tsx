"use client";

import { useActionState } from "react"; // Importa um hook personalizado para gerenciar estado e ações do formulário
import { createPost } from "@/actions"; // Importa a ação createPost que será executada ao submeter o formulário
import FlashMessage from "./FlashMessage";
import ImagePreview from "./ImagePreview";
import Label from "./Label";
import Button from "./Button";

const CreatePostForm = () => {

    // Usa o hook useActionState para gerenciar o estado do formulário e a função de submissão
    const [formState, formAction] = useActionState(createPost, {
        message: "", // Define a mensagem inicial de feedback como vazia
        type: "success", // Define o tipo de mensagem inicial como "sucesso"
    });

    return (
        <div>
            {/* Renderiza uma mensagem de feedback se houver */}
            {formState.message && <FlashMessage message={formState.message} type={formState.type} />}

            <form
                className="flex flex-col gap-4"
                action={formAction} // Define a função de ação a ser executada ao submeter o formulário
            >
                {/* Componente para pré-visualizar imagens carregadas */}
                <ImagePreview />

                {/* Campo de texto para o conteúdo do post */}
                <div>
                    <Label htmlFor="caption" text="Conteúdo do post" />
                    <textarea
                        id="caption"
                        name="caption"
                        placeholder="Digite algo..."
                        className="h-32 p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none"
                    ></textarea>
                </div>

                {/* Botão para submeter o formulário */}
                <div className="flex justify-end">
                    <Button type="submit" text="Criar Post" />
                </div>
            </form>
        </div>
    )
}

export default CreatePostForm; 
