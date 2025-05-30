import axios from "axios";

export async function fetchPosts() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
}

export async function addPost(newPost) {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost,
  );
  return response.data;
}
