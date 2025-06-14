import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PostList from "./components/postList";
import AddPost from "./components/addpost";
import { fetchPosts } from "./api/post";
import { Outlet, useLocation } from "react-router-dom";

// async function fetchPosts() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//     return response.json()
// }

function App() {
  const [showAddPost, setShowAddPost] = useState(false);
  const location = useLocation();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
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

  // Check if we're on a user detail page
  const isUserDetailPage = location.pathname.includes("/user/");

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleAddPost}>
        {showAddPost ? "Hide Add Post" : "Show Add Post"}
      </button>
      {showAddPost && <AddPost />}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Only show the user list if we're not on a user detail page */}
        {!isUserDetailPage && (
          <div style={{ flex: "1" }}>
            <h2>User List</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {users.map((user) => (
                <PostList user={user} key={user.id} />
              ))}
            </ul>
          </div>
        )}

        {/* User detail content */}
        <div style={{ flex: "1" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
