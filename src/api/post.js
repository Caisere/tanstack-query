import axios from "axios";


const BASED_URL = "http://localhost:3001/users"


export async function fetchPosts() {
  const response = await axios.get(
    BASED_URL,
  );
  console.log(response.data);
  return response.data;
}

export async function addPost(newPost) {
  const response = await axios.post(
    BASED_URL, 
    newPost,
  );
  return response.data;
}

export async function deleteUser(id) {
    try {
        const response = await axios.delete(`${BASED_URL}/${id}`)
        return response.data
    } catch {
        throw new Error("Failed to delete user")
    }
}
