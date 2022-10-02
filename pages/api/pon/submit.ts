import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(ponSubmitRoute, sessionOptions);

async function ponSubmitRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
    }

    if (await prisma.user.count({where: {id: req.session.id, role: "STAFF"}}) === 0) {
        return res.status(401).send("Unauthorized");
    }

    const { id } = req.body;

    if (id == undefined) {
        return res.status(400).send("Missing PON ID");
    }

    const result = await prisma.pON.updateMany({
        where: {id: id, status: "ISSUED", request: {requestedById: req.session.id}},
        data: {
            status: "PENDING"
        }
    })

    if (result.count) {
        return res.status(200).send(`PON successfully submitted`);
    } else {
        return res.status(400).send(`Unable to submit PON`);
    }
}