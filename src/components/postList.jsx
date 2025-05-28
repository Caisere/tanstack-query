import React from 'react'

const PostList = ({post}) => {
    return (
        <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </li>
    );
}

export default PostList