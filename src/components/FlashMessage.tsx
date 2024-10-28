import React, { useEffect, useState } from "react";

interface FlashMessageProps {
    message: string;
    type: string;    // Tipo da mensagem (ex: "success" ou "error")
}

// Componente FlashMessage que exibe mensagens temporárias
const FlashMessage = ({ message, type }: FlashMessageProps) => {
    const [visible, setVisible] = useState(true); // Estado que controla a visibilidade da mensagem

    useEffect(() => {
        // Define um timer que oculta a mensagem após 3 segundos
        const timer = setTimeout(() => {
            setVisible(false); // Altera o estado para ocultar a mensagem
        }, 3000);

        // Função de limpeza do efeito que cancela o timer se o componente for desmontado
        return () => clearTimeout(timer);
    }, []); // O efeito é executado apenas uma vez ao montar o componente

    if (!visible) return null; // Se a mensagem não for visível, não renderiza nada

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-md 
                ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {message} {/* Exibe a mensagem passada como propriedade */}
        </div>
    );
};

export default FlashMessage; 
