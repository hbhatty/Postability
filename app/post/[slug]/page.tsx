"use client";

import Posts from "@/app/components/Posts";
import { PostType } from "@/app/types/PostType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/app/components/AddComments";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};
const fetchDetails = async (slug: string) => {
  try {
    const res = await axios.get(`/api/posts/${slug}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  // const res = await axios.get(`/api/posts/${slug}`)
  // return res.data
};
export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading..."
  console.log(data)
  return (
    <div>
      <Posts
        id={data?.id}
        name={data.user.name}
        avatar={data.user.image}
        postInfo={data.title}
        comments={data.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment: any) => (
        <div key={comment?.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={23}
              height={23}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.comment}</div>
        </div>
      ))}
    </div>
  );
}
