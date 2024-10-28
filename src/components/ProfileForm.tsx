"use client";

import { User } from "types/User"; // Importa o tipo User para tipar o usuário
import { useActionState } from "react"; // Importa um hook customizado para gerenciar o estado da ação
import { updateUserProfile } from "@/actions"; // Importa a função para atualizar o perfil do usuário
import Label from "./Label";
import Button from "./Button";
import ImagePreview from "./ImagePreview";
import FlashMessage from "./FlashMessage";

type ProfileFormProps = {
    user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
    // Usa o hook useActionState para gerenciar o estado da ação de atualização do perfil
    const [formState, formAction] = useActionState(updateUserProfile, {
        message: "", // Mensagem inicial (vazia)
        type: "success", // Tipo inicial da mensagem
    });

    return (
        <div>
            {/* Exibe a mensagem de feedback se existir */}
            {formState.message && <FlashMessage message={formState.message} type={formState.type} />}

            {/* Formulário para edição do perfil */}
            <form
                className="flex flex-col gap-4"
                action={formAction} // Ação a ser executada ao enviar o formulário
            >
                <input type="hidden" name="id" value={user.id} /> {/* Campo oculto para o ID do usuário */}

                <div>
                    <Label htmlFor="name" text="Nome" />
                    <input
                        type="text" // Campo de texto para o nome do usuário
                        id="name"
                        name="name"
                        placeholder="Digite o seu nome"
                        defaultValue={user.name || ""} // Valor padrão, se existir, ou vazio
                        className="p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none"
                    />
                </div>

                <ImagePreview /> {/* Componente para pré-visualização da imagem do perfil */}

                <div className="flex justify-end">
                    <Button type="submit" text="Salvar" /> {/* Botão para enviar o formulário */}
                </div>
            </form>
        </div>
    )
}

export default ProfileForm; 
