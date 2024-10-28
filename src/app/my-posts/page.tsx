import { deletePost, getUserPosts } from "@/actions"; // Importa a função para buscar posts do usuário
import { auth } from "auth"; // Importa a função de autenticação
import Image from "next/image"; // Importa o componente de imagem otimizada do Next.js
import { redirect } from "next/navigation"; // Importa a função para redirecionamento
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";

const MyPostsPage = async () => {
    const session = await auth(); // Verifica a sessão do usuário autenticado

    let userId = null;

    if (session) {
        userId = session.user.userId; // Armazena o ID do usuário autenticado
    } else {
        redirect("/"); // Redireciona para a página inicial caso não haja sessão ativa
    }

    const posts = await getUserPosts(userId); // Busca os posts do usuário autenticado

    return (
        <div className="mx-auto my-10 p-4">
            <h1 className="text-[2rem] leading-10 font-semibold text-center mb-8">
                Minhas Postagens
            </h1>
            {posts.length === 0 ? ( // Verifica se o usuário possui posts
                <div className="text-center">
                    <p className=" mb-4 font-medium">
                        Você ainda não tem Postagens.
                    </p>
                    <div className="flex justify-center">
                        <ButtonLink text="Criar nova Postagem" url="/post/new" /> {/* Botão para criar nova postagem */}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grind-cols-3 gap-6">
                    {posts.map((post) => ( // Mapeia cada post do usuário
                        <div key={post.id} className="border rounded p-4 shadow-sm">
                            <div className="flex justify-center">
                                <Image
                                    src={post.imageUrl} // Exibe a imagem do post
                                    alt={`Imagem do Post`}
                                    className="w-[366px] h-[218px] object-cover mb-4 rounded"
                                    width={366}
                                    height={218} />
                            </div>
                            {post.caption && ( // Exibe a legenda do post, se houver
                                <p className="mb-2 text-sm font-medium">
                                    {post.caption}
                                </p>
                            )}
                            <form action={deletePost}> {/* Formulário para deletar o post */}
                                <input type="hidden" name="userId" value={userId} /> {/* Campo oculto com o ID do usuário */}
                                <input type="hidden" name="postId" value={post.id} /> {/* Campo oculto com o ID do post */}
                                <div className="flex justify-end">
                                    <Button text="Excluir" type="submit" danger={true} /> {/* Botão para excluir a postagem */}
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            )}
        </div >
    );
}

export default MyPostsPage;
