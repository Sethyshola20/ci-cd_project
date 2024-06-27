import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password }:{email:string,password:string} = req.body;
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password
                }
            });
           return res.status(200).json(user);
        } catch (error:any) {
            return res.status(400).json({ message: 'Something went wrong' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}