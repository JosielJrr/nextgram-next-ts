import { getAllPosts } from "@/actions"; // Importa a função para obter todos os posts
import Post from "@/components/Post"; // Importa o componente Post para exibir cada post individual
import { auth } from "auth"; // Importa a função de autenticação para verificar a sessão do usuário


export default async function Home() {
  const posts = await getAllPosts();  // Obtém todos os posts chamando a função assíncrona

  const session = await auth();  // Verifica a sessão do usuário autenticado

  let userId = null;

  // Se a sessão existir, obtém o ID do usuário
  if (session) {
    userId = session.user.userId;
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-4 my-10">
      <h1 className="text-[2rem] leading-10 font-semibold"> {/* Título principal */}
        Confira os Posts mais recentes
      </h1>
      <div>
        {posts && posts.length > 0 ? ( // Verifica se existem posts para exibir
          <div className="mt-8">
            {posts.map((post) => ( // Mapeia os posts e renderiza o componente Post para cada um
              <Post key={post.id} post={post} currentUserId={userId} /> // Passa o post e o ID do usuário atual como props
            ))}
          </div>
        ) : (
          <p>Ainda não há posts!</p> // Mensagem exibida se não houver posts
        )}
      </div>
    </div>
  );
}
