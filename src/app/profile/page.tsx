import { getUserByEmail } from "@/actions"; // Função para obter o usuário pelo email
import ProfileForm from "@/components/ProfileForm";
import { auth } from "auth"; // Função de autenticação
import Image from "next/image"; // Componente de imagem otimizado do Next.js
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const session = await auth(); // Obtém a sessão autenticada do usuário

    if (!session || !session.user) return redirect("/"); // Redireciona para Home se não houver sessão ou usuário

    const user = await getUserByEmail(session.user.email); // Busca o usuário pelo email da sessão

    if (!user) return redirect("/"); // Redireciona para Home se o usuário não for encontrado (Reforça segurança)

    return (
        <div className="max-w-xl mx-auto my-12 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-semibold text-center mb-8">
                Perfil de {user.name} {/* Exibe o nome do usuário */}
            </h1>

            {user.image && ( // Exibe a imagem de perfil se disponível
                <div className="flex justify-center mb-8">
                    <Image
                        src={user.image}
                        alt={`Perfil de ${user.name}`}
                        className="w-full h-80 object-cover rounded"
                        width={494}
                        height={494} />
                </div>
            )}

            <ProfileForm user={user} /> {/* Componente de formulário para editar perfil */}
        </div>
    );
}

export default ProfilePage;
