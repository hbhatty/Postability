import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //validation and creating the post
    if(req.method === "POST"){
        //checks if user is logged in to make post
        const sesh = await getServerSession(req, res, authOptions);
        if(!sesh) return res.status(401).json({message: "Please log in before making a post"})
        //get user, where email matches
        const prismaUser = await prisma.user.findUnique({
            where: {email: sesh?.user?.email},
        })
         //info we get
         const {title, postId} = req.body.data
        //  console.log(req.body.data);
         //if nothing entered
         if(!title.length){
             return res.status(401).json({message: "Please enter something!"})
         }
        //add a comment
        try{
            const result = await prisma.comment.create({
                data: {
                    comment: title,
                    userID: prismaUser?.id,
                    postID: postId,
                }
            })
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.status(403).json({err: "Error has occured"})
        }
    }

}