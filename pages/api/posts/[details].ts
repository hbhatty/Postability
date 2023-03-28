import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //validation and creating the post
    if(req.method === "GET"){
        //get current users posts
        try{
            console.log(req.query)
            const data = await prisma.post.findUnique({
                where: {
                    id: req.query.details,
                },
                include: {
                    user: true,
                    Comment: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            user: true
                        },
                    },
                }
            })
            return res.status(200).json(data)
        }catch(err){
            console.log(err);
            res.status(403).json({err: "Error has occured"})
        }
    }

}