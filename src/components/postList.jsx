import React, {useState} from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/post";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import AddPost from "./addpost";
import EditUser from "./editUser";

const PostList = ({ user }) => {
    const [editUser, setEditUser] = useState(false)
    const {name, email, phone, username, id} = user
    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        // mutationKey: ['users', id],
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success(`User ${id} deleted successfully`);
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        },
        onError: (error) => {
            toast.error(`Error deleting user ${id}: ${error.message}`)
        }
    })

    function handleDelete(id) {
        mutate(id)
        console.log(id)
    }
    
    return (
        <>
            <li>
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{phone}</p>
                <p>{username}</p>
                <p>{id}</p>
            </li>

            

            <button onClick={() => handleDelete(id)}
                disabled={isPending}
            >
                {isPending ? "Deleting..." : "Delete"}
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                setEditUser(user => !user)
            }}>
                Edit User
            </button>

            {editUser && <EditUser user={user} />}
        </> 
    );
};

export default PostList;
