import { revalidatePath } from "next/cache";
import { supabase } from "../supabaseClient";

export default function Home({ books }) {
  return (
    <div>
      <h1>All Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <img src={book.cover_image_url} alt={book.title} width="100" />
            <h2>{book.title}</h2>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data: books } = await supabase.from("Books").select("*");
  return {
    props: {
      books: books || [],
    },
    revalidate: 10,
  };
}
