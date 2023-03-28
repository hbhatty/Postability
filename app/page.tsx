"use client"
import AddPost from "./components/AddPost"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Posts from "./components/Posts"
import {PostType} from "./types/PostType"


//fetch all posts from api route and return the data
const posts = async() =>{
  const res = await axios.get("/api/posts/getPosts")
  return res.data;
}

export default function Home() {
  const {data, error, isLoading} = useQuery<PostType[]>({
    queryFn: posts,
    //used for caching
    queryKey: ["posts"],
  })
  if(error) return error
  //prints loading before actually showing us the posts
  if(isLoading) return "Loading...."
  console.log(data)
  return (
    <main>
      <AddPost/>
      {data?.map((posts, key) =>(
      <Posts key = {key}id = {posts.id} comments = {posts.Comment} name = {posts.user.name} avatar = {posts.user.image} postInfo = {posts.title}/>
      ))}
    </main>
  )
}
