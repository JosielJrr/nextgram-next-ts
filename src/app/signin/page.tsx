import { signIn, providerMap } from "auth"; // Importa a função de login e o mapeamento de provedores de autenticação
import { BsGoogle } from "react-icons/bs"; // Importa o ícones dos provedores 

const icons = [{ name: "Google", icon: <BsGoogle /> }]; // Define ícones disponíveis, associando o nome do provedor ao ícone correspondente

const SignInPage = async () => {
    // Função que encontra o ícone correspondente ao nome do provedor
    const findIcon = (name: string) => {
        const icon = icons.find((item) => item.name === name); // Procura um ícone pelo nome do provedor
        return icon?.icon ?? ""; // Retorna o ícone encontrado ou uma string vazia se não existir
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Acesse ou crie sua conta com uma das opções disponíveis
            </h2>
            <div className="space-y-4 w-full max-w-sm">
                {Object.values(providerMap).map((provider) => (
                    <form
                        key={provider.id} // Define uma chave única para cada provedor de autenticação
                        className="w-full"
                        action={async () => { // Define o redirecionamento após login
                            "use server";
                            await signIn(provider.id, { redirectTo: "/" }); // Inicia o login com redirecionamento para a página inicial
                        }}
                    >
                        <button
                            className="flex items-center justify-center w-full p-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {findIcon(provider.name)} {/* Exibe o ícone do provedor */}
                            <span className="ml-2 font-medium">
                                Entrar com o <strong>{provider.name}</strong> {/* Exibe o nome do provedor */}
                            </span>
                        </button>
                    </form>
                ))}
            </div>
        </div>
    );
};

export default SignInPage;
