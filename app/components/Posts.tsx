"use client";
import Image from "next/image";
import Link from "next/link";

//after fetching data we need to render every post saved in our database, we have this information sent in by our pages file
export default function Post(person: {id: string, avatar: string, name: string, postInfo: string, comments: any}) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={35}
          height={35}
          src={person.avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{person.name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{person.postInfo}</p>
      </div>
      <div className="flex gap-4 cursor.pointer items-center">
        <Link href = {`/post/${person.id}`}>
          <p className="text-sm font-bold text-gray-700">{person.comments?.length} Comments</p>
        </Link>
      </div>
    </div>
  );
}
