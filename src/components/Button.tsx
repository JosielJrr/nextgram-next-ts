import { ComponentProps } from "react"; // Importa o tipo ComponentProps do React

// Define o tipo das propriedades para o componente Button
type ButtonProps = ComponentProps<"button"> & { // Inclui todas as props padrão de um botão HTML
    text: string;
    danger?: boolean; // Propriedade opcional para indicar um estilo dinâmico no botão
}

const Button = ({ text, danger = false, ...props }: ButtonProps) => {
    return (
        <button
            data-danger={danger}
            className="h-8 text-sm font-medium text-white py-1 px-6 rounded flex items-center bg-blue-800 hover:bg-blue-700 data-[danger=true]:bg-red-500 data-[danger=true]:hover:bg-red-400" // Estilização do botão com base no valor de "danger"
            {...props} // Passa quaisquer outras propriedades recebidas para o elemento <button>
        >
            {text}
        </button>
    );
}

export default Button; 
