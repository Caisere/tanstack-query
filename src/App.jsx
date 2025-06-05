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
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
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
        {users.map((user) => (
          <PostList user={user} key={user.id} />
        ))}
      </ul>
    </>
  );
}

export default App;
