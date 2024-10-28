import { ComponentProps } from "react"; // Importa ComponentProps para herdar as propriedades HTML padrão

type LabelProps = ComponentProps<"label"> & {
    text: string;
}

const Label = ({ text, ...props }: LabelProps) => {
    return (
        <label
            className="text-sm font-medium text-black ml-2"
            {...props} // Propaga todas as propriedades adicionais tipadas para o elemento <label>
        >
            {text} {/* Exibe o texto da label */}
        </label>
    )
}

export default Label;
