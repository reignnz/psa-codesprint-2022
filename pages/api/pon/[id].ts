import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import prisma from "../../../lib/prisma";

export default withIronSessionApiRoute(ponUpdateRoute, sessionOptions);

async function ponUpdateRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user.role !== "STAFF") {
    return res.status(401).send("Unauthorized");
  }

  console.log(req.body)

  const result = await prisma.pON.updateMany({
    where: {
      status: "ISSUED",
      id: Number(req.query.id),
      request: {
        requestedBy: {
          id: req.session.user.id,
        },
      },
    },
    data: {
      company_name: req.body.company_name,
      vehicle_number: req.body.vehicle_number,
      driver_name: req.body.driver_name,
      driver_pass_number: req.body.driver_pass_number,
      item_descriptions: req.body.item_descriptions,
    },
  });

  console.log(result);

  if (result.count) {
    return res.status(200).send("PON updated successfully");
  } else {
    return res.status(400).send("Unable to update PON");
  }
}
