// import { useState } from "react";
// import { useAddPost } from "../hooks/usePost";
import { useForm } from "react-hook-form";
import { addPost } from "../api/post";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/post";
import { useQueryClient } from "@tanstack/react-query";


function AddPost() {
    const queryClient = useQueryClient();
//   const [title, setTitle] = useState("");
//   const [post, setPost] = useState("");
const {data: users} = useQuery({
    queryKey: ["users"],
    queryFn: fetchPosts
})
const {register, handleSubmit, reset, formState} = useForm();
const {errors} = formState;


const {mutate, isPending} = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
        toast.success("User added successfully");
        queryClient.invalidateQueries({
            queryKey: ["users"]
        });
        reset();
    },
    onError: (error) => {
        toast.error(error.message)
    }
})

function onSubmit(userInfo) {
    const userWithId = {
        id: Number(users[users.length - 1].id) + 1,
        ...userInfo
    }
    mutate(userWithId)
    console.log(userWithId)
}

function handleError(errors) {
    console.log(errors)
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
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    id="name"
                    {...register('name', {
                        required: "Name is required"
                    })}
                />
                {errors?.name?.message && <span style={{color: "red"}}>{errors.name.message}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                        },
                        validate: (value) => {
                            if (!value.includes("@")) {
                                return {
                                    message: "Email must contain @"
                                }
                            }
                            return true
                        }
                    })}
                />
                {errors?.email?.message && <span style={{color: "red"}}>{errors.email.message}</span>}
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    id="username"
                    {...register('username', {
                        required: "Username is required"
                    })}
                />
                {errors?.username?.message && <span style={{color: "red"}}>{errors.username.message}</span>}
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    {...register('phone', {
                        required: "Phone number is required",
                    })}
                />
                {errors?.phone?.message && <span style={{color: "red"}}>{errors.phone.message}</span>}
            </div>
            <button 
                type="submit"
                disabled={isPending}
            >{isPending ? "Adding User" : "Add User"}</button>
        </form>
    );
}

export default AddPost;
