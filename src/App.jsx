import React from "react"
import { useQuery } from "@tanstack/react-query"
import PostList from "./components/postList"

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
}

function App() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error Loading Post {error.message}</p>
    console.log(data)

    return (
        <ul>
            {data.map(post => (
                <PostList post={post} />
            ))}
        </ul>
    )
}

export default App
