import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";

export default async function movieHandler(req:NextApiRequest,res:NextApiResponse){
    const {id} = req.query;
    try {
        if(req.method === "GET"){
            const movie = await prisma.movie.findUnique({
                where:{
                    id:(id) as string
                }
            })
            return res.status(200).json({status:"success",data:movie});
        }else if (req.method === "PUT"){
            const {title,description}:{title:string,description:string} = req.body;
            const movie = await prisma.movie.update({
                where:{
                    id:(id) as string
                },
                data:{
                    title,
                    description,
                }
            });
            return res.status(200).json({status:"success",data:movie});
        }else if (req.method === "DELETE"){
            const movie = await prisma.movie.delete({
                where:{
                    id:(id) as string
                }
            });
            return res.status(200).json({status:"success",data:movie});
        }
        return res.status(405).json({message:"Method not allowed"});
    } catch (error:any) {
        return res.status(500).json({message:error.message});
    }
}