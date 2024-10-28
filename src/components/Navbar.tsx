import { getUserByEmail } from "@/actions"; // Função para obter o usuário pelo email
import { auth, signOut } from "auth"; // Funções de autenticação
import Image from "next/image"; // Componente de imagem otimizado do Next.js
import Link from "next/link";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Navbar = async () => {
    const session = await auth(); // Obtém a sessão autenticada do usuário
    const user = await getUserByEmail(session?.user.email); // Busca o usuário pelo email da sessão

    return (
        <div className="bg-gray-800 text-white px-10 py-5 flex justify-between items-center">
            <Link href={"/"}
                className="text-white hover:text-zinc-300 text-lg font-bold">
                NextGram {/* Link para a página inicial */}
            </Link>
            <div>
                {user ? ( // Se o usuário está autenticado:
                    <div className="flex gap-4 items-center">
                        <p className="text-white font-medium">{user.name}</p> {/* Nome do usuário autenticado */}
                        {user.image && ( // Se a imagem existe, exibe-a
                            <Image
                                src={user.image}
                                alt={`Perfil de: ${user.name}`}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full" />
                        )}
                        <Link href={"/profile"}
                            className="text-white hover:text-zinc-300">
                            Perfil {/* Link para a página de perfil */}
                        </Link>
                        <Link href={"/post/new"}
                            className="text-white hover:text-zinc-300">
                            Publicar {/* Link para criação de novas postagens */}
                        </Link>
                        <Link href={"/my-posts"}
                            className="text-white hover:text-zinc-300">
                            Minhas Postagens {/* Link para ver postagens do usuário */}
                        </Link>
                        <form
                            action={async () => {
                                "use server"; // Executa no servidor
                                await signOut(); // Desconecta o usuário
                            }}
                        >
                            <Button text="Sair" danger={true} type="submit" /> {/* Botão de logout com estilo */}
                        </form>
                    </div>
                ) : (
                    <ButtonLink text="Entrar" url="/signin" /> // Se não autenticado, botão para página de login
                )}
            </div>
        </div>
    );
}

export default Navbar;
