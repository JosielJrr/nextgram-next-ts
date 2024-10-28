import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "auth";
import { redirect } from "next/navigation";

const NewPostPage = async () => {
    const session = await auth();

    if (!session) return redirect("/");
    return (
        <div className="w-[35rem] mx-auto p-4 my-10">
            <h1 className="text-3xl font-semibold text-center mb-8">
                Criar novo Post
            </h1>
            <div className="border border-zinc-300 p-4 rounded mt-8">
                <CreatePostForm />
            </div>
        </div>
    )
}

export default NewPostPage;