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
        if(!sesh) return res.status(400).json({message: "Please log in before making a post"})
        const title: string = (req.body.title)
        //get the user thats logged in
        const prismaUser = await prisma.user.findUnique({
            //find user where the email is equivalent to the current persons email
            where: {email: sesh?.user?.email}
        })
        //if input is longer than 300
        if(title.length > 300) return res.status(403).json({message: "Please write a smaller post"})
        if (!title.length) return res.status(403).json({message: "Please write something before submitting!"});

        //creating post
        try{
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id,
                },
            })
            res.status(200).json(result)
        }catch(err){
            res.status(403).json({err: "Error has occured"})
        }
    }

}