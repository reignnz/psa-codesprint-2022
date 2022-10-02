import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";

import prisma from "../../../lib/prisma";

export default withIronSessionApiRoute(ponSignRoute, sessionOptions);

async function ponSignRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id, isAccepted } = req.body;
  if (id == undefined || isAccepted == undefined) {
    return res.status(400).send("Missing PON ID or acceptance status");
  }
  if (
    (await prisma.user.count({
      where: {
        id: req.session.id,
        role: "STAFF",
        visibilities: { some: { ponId: id, userId: req.session.id } },
        requests: { none: { requestedById: req.session.id, pon: { id: id } } },
      },
    })) === 0
  ) {
    return res
      .status(401)
      .send(`Unable to ${isAccepted ? "accept" : "reject"} PON`);
  }

  const result = await prisma.pON.update({
    where: { id: id },
    data: {status: isAccepted ? "SIGNED" : "ISSUED"},
  });

  if (result) {
    return res.status(200).send(`PON successfully ${isAccepted ? "accepted" : "rejected"}`);
  } else {
    return res.status(400).send(`Unable to ${isAccepted ? "accept" : "reject"} PON`);
  }
}
