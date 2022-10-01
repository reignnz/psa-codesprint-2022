import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import prisma from "../../lib/prisma";

export default withIronSessionApiRoute(requestRoute, sessionOptions);

async function requestRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user.role !== "STAFF") {
    return res.status(401).send("Unauthorized");
  }

  await prisma.request.create({
    data: {
      requestedBy: {
        connect: {
          
        },
      },
    },
  });

  return res.status(200).send("Request submitted successfully");
}
