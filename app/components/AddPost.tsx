"use client";

import { title } from "process";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Createpost() {
  //used to count how many characters user has entered
  const [title, setTitle] = useState("");
  //used to hide post button until post is finshed loading
  const [disabled, setDisabled] = useState(false);
  let toastID: string = "hello"
  const queryClient = useQueryClient()

  //create post
  const { mutate } = useMutation(
    //sends the information to our endpoint
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message, { id: toastID },);
        }
        //show button again
        setDisabled(false);
      },
      //if everything went fine, reset textbox
      onSuccess: (data) => {
        toast.success("Post has been created 😀", {
          id: toastID,
        })
        //fetches data again in real time, so we dont have to refresh(re-fetch)
        queryClient.invalidateQueries(["posts"])
        setTitle("");
        setDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    //stops refreshing
    e.preventDefault();
    toastID = toast.loading("Creating your post...", {
      id: toastID,
    });
    setDisabled(true);
    //call function with user inputted post
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Write anything you want "
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length} / 300 words`}</p>
        <button
          disabled={disabled}
          className="text-sm bg-teal-600 text-white py-2 rounded-xl p-8 disabled:opacity-25"
          type="submit"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
