"use client";

//used to log out
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

//specified type for our image
type UserImg = {
    image: string
}
//passing in the image that we need
export default function Logged({image}: UserImg) {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="bg-gray-700 text-white text-sm px-7 py-2 rounded-md"
      >
        Log Out
      </button>
      {/* //goes to our user dashboard from the image we are seen */}
      <Link href = {"/dashboard"}>
        <Image className = "w-14 rounded-full"width = {70} height = {70} src = {image} alt = ""/>
      </Link>
    </li>
  );
}
