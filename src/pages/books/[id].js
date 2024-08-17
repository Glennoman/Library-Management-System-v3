import { supabase } from "../../supabaseClient";
import { useRouter } from "next/router";

export default function Book({ book }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.cover_image_url} alt={book.title} width="200" />
      <p>{book.description}</p>
      <p>Author: {book.author.name}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const { data: books } = await supabase.from("Books").select("id");
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { data: book } = await supabase
    .from("Books")
    .select(`*, author:Authors(*)`)
    .eq("id", params.id)
    .single();
  return {
    props: {
      book,
    },
  };
}
