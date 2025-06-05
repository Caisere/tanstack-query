import React from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/post";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const PostList = ({ user }) => {
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
        </> 
    );
};

export default PostList;
