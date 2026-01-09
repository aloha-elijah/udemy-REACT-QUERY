import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return (
      <>
        <div>Error loading comments.</div>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isLoading && <span> Deleting...</span>}
        {deleteMutation.isError && (
          <span style={{ color: "red" }}> Error deleting post.</span>
        )}
        {deleteMutation.isSuccess && (
          <span style={{ color: "green" }}> Post deleted.</span>
        )}
      </div>
      <div>
        <button onClick={() => updateMutation.mutate({ postId: post.id })}>
          Update title
        </button>
        {updateMutation.isLoading && <span> Updating...</span>}
        {updateMutation.isError && (
          <span style={{ color: "red" }}> Error updating post.</span>
        )}
        {updateMutation.isSuccess && (
          <span style={{ color: "green" }}> Post updated.</span>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
