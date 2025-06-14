import axios from "axios";


const BASED_URL = "http://localhost:3001/users"


export async function fetchPosts() {
  const response = await axios.get(
    BASED_URL,
  );
//   console.log(response.data);
  return response.data;
}

export async function fetchPostsById(id) {
  const response = await axios.get(`${BASED_URL}/${id}`);
    console.log('API call completed for each User')
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

export async function editUser({editedUserInfo, editId}) {
    console.log(editId)
    try {
        const response = await axios.put(`${BASED_URL}/${editId}`, {
            name: editedUserInfo.name,
            email: editedUserInfo.email,
            username: editedUserInfo.username,
            phone: editedUserInfo.phone
        })
        return {
            name: response.data.name,
            email: response.data.email,
            username: response.data.username,
            phone: response.data.phone
        }
    } catch {
        throw new Error("Failed to edit user")
        // return {
        //     name: user.name,
        //     email: user.email,
        //     username: user.username,
        //     phone: user.phone
        // }
    }
}
