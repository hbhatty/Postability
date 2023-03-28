"use client";

import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import ToggleDelete from "./ToggleDelete";
import axios from "axios";
import toast  from "react-hot-toast";

type propType = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: propType) {
  console.log(comments);
  //toggle
  const [toggle, setToggle] = useState(false);
  let deleteToastId: string = "hello";
  const queryClient = useQueryClient()
  //delete
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting post", {id:deleteToastId})
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Post has been deleted", {id:deleteToastId})
        queryClient.invalidateQueries(["auth-posts"])
      },
    }
  );
  const deletePost = () => {
    deleteToastId = toast.loading("Deleting post....", {id:deleteToastId})
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image width={30} height={30} src={avatar} alt={"avatar"} />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <ToggleDelete deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
