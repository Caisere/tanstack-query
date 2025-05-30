import { useState } from "react";
import { useAddPost } from "../hooks/usePost";

function AddPost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const { mutate } = useAddPost();

  function handleSubmitPost(e) {
    e.preventDefault();
    let newPost = {
      title,
      body: post,
      id: new Date(),
    };
    console.log({ title, body: post, id: newPost.id });
    mutate(newPost);
    setPost("");
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmitPost}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Post:</label>
        <textarea value={post} onChange={(e) => setPost(e.target.value)} />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default AddPost;
