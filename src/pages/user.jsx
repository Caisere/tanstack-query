import React from "react";
import { useParams } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPostsById } from "../api/post";

const User = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const {data, isLoading} =  useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchPostsById(id),
        initialData: () => {
            const eachUser = queryClient.getQueryData(['users'])?.find((user) => user.id === id );
            console.log('use initial data while waiting for the data from the api to eliminate loading....')
            if(eachUser) {
                return eachUser
            } else {
                return undefined
            }
        },
        staleTime: 0,
        onError: (error) => {
            console.log('error', error)
        },
        
    })
    if(isLoading) return <h1>Loading...</h1>


    console.log(data)
    const {name, email, phone, username, id:userId} = data

    return (
        <div
            style={{
                padding: "20px",
                margin: "20px",
                border: "2px solid red",
                backgroundColor: "#fff",
        }}
        >
            <h2>User Details</h2>
            <p>{data.name}</p>
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{phone}</p>
                <p>{username}</p>
                <p>{userId}</p>
        </div>
    );
};

export default User;
