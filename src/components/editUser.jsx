// import { useState } from "react";
// import { useAddPost } from "../hooks/usePost";
// import { addPost } from "../api/post";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { editUser } from "../api/post";


function EditUser({user = {}}) {
    const queryClient = useQueryClient();

    const {id: editId, ...editValues} = user;
    const isEditSession = Boolean(editId)

// console.log(user)

const {register, handleSubmit, reset, formState} = useForm({
    defaultValues: isEditSession ? editValues : {}
});
const {errors} = formState;


const {mutate, isPending} = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
        toast.success("Successfully Edited the User Information");
        queryClient.invalidateQueries({
            queryKey: ["users"]
        });
        reset();
    },
    onError: (error) => {
        toast.error(error.message)
    }
})

function onSubmit(editedUserInfo) {
    mutate({editedUserInfo, editId})
    console.log({editedUserInfo, editId})
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
            >{isEditSession && "Save User"}</button>
        </form>
    );
}

export default EditUser;
