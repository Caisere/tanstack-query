import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../api/post";

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["posts"], (old) => {
        return [newPost, ...(old || [])];
      });

      // Return a context object with the snapshot
      return { previousPosts };
    },
    onError: (error, newPost, context) => {
      console.error("Error adding post:", error);
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(["posts"], context.previousPosts);
    },
    // onSettled: () => {
    //   // Always refetch after error or success to ensure cache consistency
    //   queryClient.invalidateQueries({ queryKey: ["posts"] });
    // },
  });
};
