import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BASED_URL = "http://localhost:3001/users";
const BASED_URL1 = "https://jsonplaceholder.typicode.com/posts";

async function getPost(pageParam = 1) {
  const response = await axios.get(`${BASED_URL}?_limit=2&_page=${pageParam}`);
  // Return both the data and metadata about pagination
  return {
    items: response.data,
    nextPage: response.data.length === 2 ? pageParam + 1 : undefined,
  };
}

const LoadMore = () => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["user"],
    queryFn: ({ pageParam }) => getPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    // Optional: Add these for better UX
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, // 1 minute
  });

  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  return (
    <div>
        <Link to='/'>Home</Link>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map((user) => (
            <div key={user.id}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p>{user.username}</p>
              <p>{user.phone}</p>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      {isFetching && !isFetchingNextPage && <p>Refreshing...</p>}
    </div>
  );
};

export default LoadMore;
