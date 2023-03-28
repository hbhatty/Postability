import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //validation and creating the post
    if(req.method === "GET"){
        //checks if user is logged in to make post
        const sesh = await getServerSession(req, res, authOptions);
        if(!sesh) return res.status(400).json({message: "Please log in before making a post"})

        //get current users posts
        try{
            //finds unique user
            const data = await prisma.user.findUnique({
                where: {
                    email: sesh?.user?.email,
                },
                //include post table, ordered and include comments table that is linked
                include: {
                    posts: {
                        orderBy: {
                            createdAt: "desc"
                        },
                        include: {
                            Comment: true,
                        },
                    }
                }
            })
            res.status(200).json(data)
        }catch(err){
            console.log(err);
            res.status(403).json({err: "Error has occured"})
        }
    }

}