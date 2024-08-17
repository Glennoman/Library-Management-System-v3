import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: image } = await supabase.storage
      .from("book-covers")
      .upload(`public/${coverImage.name}`, coverImage);

    const coverImageUrl = `${
      supabase.storage.from("book-covers").getPublicUrl(image.Key).publicURL
    }`;

    await supabase.from("Books").insert({
      title,
      author_id: authorId,
      description,
      cover_image_url: coverImageUrl,
    });

    // Redirect or show success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Author ID"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setCoverImage(e.target.files[0])}
        required
      />
      <button type="submit">Create Book</button>
    </form>
  );
}
