"use client";

import React, { useState } from "react";
import Image from "next/image";
import Label from "./Label";

const ImagePreview = () => {
    // Estados para armazenar a URL de pré-visualização da imagem e o arquivo selecionado
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Função chamada quando o usuário seleciona um novo arquivo de imagem
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Obtém o primeiro arquivo selecionado (ou `undefined` se nenhum arquivo for escolhido)

        if (file) { // Se um arquivo foi selecionado
            const reader = new FileReader(); // Cria uma nova instância de FileReader para ler o conteúdo do arquivo

            // Define uma função para ser executada ao término da leitura do arquivo
            reader.onloadend = () => {
                setImagePreview(reader.result as string); // `result` contém a URL base64 da imagem, que é armazenada para pré-visualização
                setSelectedImage(file); // Armazena o arquivo selecionado para uso posterior
            };

            reader.readAsDataURL(file); // Inicia a leitura do arquivo, convertendo-o para uma URL base64 (útil para exibir imagens)
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            {imagePreview && (
                <div className="flex justify-center mb-4">
                    <Image
                        src={imagePreview} // URL da imagem para pré-visualização
                        alt="Pré-visualização da Imagem"
                        className="w-full h-80 object-cover rounded"
                        width={494}
                        height={494}
                    />
                </div>
            )}

            {/* Input para selecionar a imagem */}
            <Label text="Selecione uma imagem" htmlFor="image" />
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*" // Restringe a seleção apenas a arquivos de imagem
                onChange={handleImageChange} // Chama handleImageChange ao selecionar um arquivo
                className="mt-2 p-2 border border-gray-300 rounded w-full"
            />

            {/* Campo oculto para armazenar o nome do arquivo selecionado, útil para envio em formulários */}
            {selectedImage && (
                <input type="hidden" name="imageFile" value={selectedImage.name} />
            )}
        </div>
    );
};

export default ImagePreview;
