import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";

export default async function moviesHandler(req:NextApiRequest,res:NextApiResponse){
    try {
        if(req.method === "GET"){
            try{
               const movies = await prisma.movie.findMany();
                return res.status(200).json({status:"success",data:movies});
                
            }catch(error:any){
                return res.status(500).json({message:error.message});
            }
        }else if (req.method === "POST"){
            try{
                const {title,description}:{title:string,description:string} = req.body;
                const movie = await prisma.movie.create({
                    data:{
                        title,
                        description,
                    }
                });
                return res.status(201).json({status:"success",data:movie});
            }catch(error:any){
                return res.status(500).json({message:error.message});
            }
        }
        return res.status(405).json({message:"Method not allowed"});
    } catch (error:any) {
        return res.status(500).json({message:error.message});
    }
}