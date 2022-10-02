import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import prisma from "../../lib/prisma";

export default withIronSessionApiRoute(requestRoute, sessionOptions);

async function requestRoute(req: NextApiRequest, res: NextApiResponse) {
  if (
    (await prisma.user.count({
      where: { id: req.session.id, role: "STAFF" },
    })) === 0
  ) {
    return res.status(401).send("Unauthorized");
  }

  await prisma.request.create({
    data: {
      requestedBy: {
        connect: {
          id: req.session.id,
        },
      },
    },
  });

  return res.status(200).send("Request submitted successfully");
}
