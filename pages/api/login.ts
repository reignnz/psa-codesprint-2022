import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      admin: true,
      staff: true,
      designatedOfficer: true,
      aetos: true,
    },
  });

  if (!user) {
    return res.status(400).send("Invalid username or password");
  }

  const passwordHash = user.password_hash;

  if (bcrypt.compareSync(password, passwordHash)) {
    req.session.user = user;
    await req.session.save();
    res.redirect("/");
  } else {
    return res.status(400).send("Invalid username or password");
  }
}
