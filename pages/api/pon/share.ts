import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default withIronSessionApiRoute(ponShareRoute, sessionOptions);

async function ponShareRoute(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
    }
    const { id, username } = req.body;
    
    if (await prisma.pON.count({where: {id: id, request: {requestedBy: {id: req.session.id}}}}) === 0) {
        return res.status(401).send("Unable to share PON");
    }

    try {
        
    const result = await prisma.pON.update({
        where: {id: id},
        data: {
            visibilities: {
                create: {
                    user: {
                        connect: {
                            username: username,
                        }
                    }
                }
            }
        }
    })

    if (result) {
        return res.status(200).send(`PON successfully shared with ${username}`);
    } else {
        return res.status(400).send(`Unable to share PON with ${username}`);
    }
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.status(400).send(`This PON has already been shared with ${username}`);
              }
        }
    }
}