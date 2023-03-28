import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //validation and creating the post
    if(req.method === "DELETE"){
        //checks if user is logged in to make post
        const sesh = await getServerSession(req, res, authOptions);
        if(!sesh) return res.status(401).json({message: "Please log in before making a post"})

        //get current users posts
        try{
            const postId = req.body
            const result = await prisma.post.delete({
                where: {
                    id: postId,
                },
            })
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.status(403).json({err: "Error has occured"})
        }
    }

}