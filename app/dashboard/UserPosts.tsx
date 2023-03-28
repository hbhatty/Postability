"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthTypes } from "../types/AuthTypes";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  // try{
  //     const res = await axios.get("/api/posts/authPosts");
  //     return res.data;
  // } catch(err){
  //     console.log(err)
  // }
  const res = await axios.get("/api/posts/authPosts");
  return res.data;
};

export default function MyPosts() {
  // const data = fetchAuthPosts();
  const { data, isLoading } = useQuery<AuthTypes>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return <h1>Loading</h1>;
  console.log(data);
  return (
    <div>
      {data?.posts.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title = {post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
