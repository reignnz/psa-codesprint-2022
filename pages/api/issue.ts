import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(issueRoute, sessionOptions);

async function issueRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user.role !== "DESIGNATED_OFFICER") {
    return res.status(401).send("Unauthorized");
  }

  const { requestId } = await req.body;

  try {
    const request = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        pon: {
          create: {
            issuedBy: { connect: { id: req.session.user.id } },
          },
        },
      },
    });
    return res.status(200).send("PON issued successfully");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Unable to issue PON");
  }
}
