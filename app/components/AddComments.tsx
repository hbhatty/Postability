"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import { toast } from "react-hot-toast";

type PostProps = {
  id?: string
}

type Comment = {
  postId?: string
  title: string
}

export default function AddComment({ id}: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string = "hi"
  const {mutate} = useMutation(
    async (data: Comment) => await axios.post("/api/posts/addComment", {data}),{
        onError: (error) => {
            setIsDisabled(false)
            if (error instanceof AxiosError) {
              toast.error(error?.response?.data?.message, { id: commentToastId },);
            }
        },
        onSuccess: (data) => {
          toast.success("Added comment", {id: commentToastId})
            setTitle("")
            queryClient.invalidateQueries(["detail=post"])
            setIsDisabled(false)
        }
    }
  )
  const submitComment = async (e: React.FormEvent) => {
    //stops refreshing
    e.preventDefault();
    commentToastId = toast.loading("Creating your post...", {
      id: commentToastId,
    });
    setIsDisabled(true);
    //call function with user inputted post
    mutate({title, postId: id});
  };
  return (
    <form onSubmit = {submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
