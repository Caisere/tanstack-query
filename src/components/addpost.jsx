// import { useState } from "react";
// import { useAddPost } from "../hooks/usePost";
import { useForm } from "react-hook-form";
import { addPost } from "../api/post";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";

function AddPost() {
    const queryClient = new QueryClient();
//   const [title, setTitle] = useState("");
//   const [post, setPost] = useState("");
const {register, handleSubmit, reset} = useForm();

const {mutate, isPending} = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
        toast.success("User added successfully");
        queryClient.invalidateQueries({
            queryKey: ["users"]
        })
        reset()
    },
    onError: (error) => {
        toast.error(error.message)
    }
})

function onSubmit(userInfo) {
    const userWithId = {
        id: Date.now(),
        ...userInfo
    }
    mutate(userWithId)
    console.log(userWithId)
}
//   const { mutate } = useAddPost();



//   function handleSubmitPost(e) {
//     e.preventDefault();
//     let newPost = {
//       title,
//       body: post,
//       id: new Date(),
//     };
//     console.log({ title, body: post, id: newPost.id });
//     mutate(newPost);
//     setPost("");
//     setTitle("");
//   }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                />
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    id="username"
                    {...register('username')}
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    {...register('phone')}
                />
            </div>
            <button 
                type="submit"
                disabled={isPending}
            >{isPending ? "Adding User" : "Add User"}</button>
        </form>
    );
}

export default AddPost;
