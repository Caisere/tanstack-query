import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PostList from "./components/postList";
import AddPost from "./components/addpost";
import { fetchPosts } from "./api/post";

// async function fetchPosts() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//     return response.json()
// }

function App() {
  const [showAddPost, setShowAddPost] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Loading Post {error.message}</p>;
  // console.log(data)
  function handleAddPost(e) {
    e.preventDefault();
    setShowAddPost(!showAddPost);
  }
  return (
    <>
      <button onClick={handleAddPost}>
        {showAddPost ? "Hide Add Post" : "Show Add Post"}
      </button>
      {showAddPost && <AddPost />}
      <ul>
        {data.map((post) => (
          <PostList post={post} key={post.id} />
        ))}
      </ul>
    </>
  );
}

export default App;
