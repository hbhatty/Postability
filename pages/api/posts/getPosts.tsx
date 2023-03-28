import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //validation and creating the post
    if(req.method === "GET"){
        //fetch all posts
        try{
            //gets all posts from our table
            const data = await prisma.post.findMany({
                //Includes our user table and comments table
                include: {
                    user:true,
                    Comment:true,
                },
                //order data by creation date
                orderBy: {
                    createdAt: "desc"
                }
            })
            res.status(200).json(data)
        }catch(err){
            res.status(403).json({err: "Error fetching posts!"})
        }
    }

}