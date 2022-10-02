import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import hashPassword from "../../../lib/hash";
import validatePassword from "../../../lib/password_check";
import { sessionOptions } from "../../../lib/session";
import bcrypt from "bcrypt";

export default withIronSessionApiRoute(updateRoute, sessionOptions);

async function updateRoute(req: NextApiRequest, res: NextApiResponse) {
  const { oldPassword, newPassword, newPasswordRepeat } = await req.body;

  if (newPassword !== newPasswordRepeat) {
    return res.status(400).send("Passwords do not match");
  }

  if (!validatePassword(newPassword)) {
    return res.status(400).send("Password is too weak");
  }

  const oldPasswordHash = await prisma.user.findUnique({
    where: {
      id: req.session.id,
    },
    select: {
      password_hash: true,
    },
  });

  if (!bcrypt.compareSync(oldPassword, oldPasswordHash?.password_hash || "")) {
    return res.status(400).send("Incorrect password");
  }

  await prisma.user.update({
    where: {
      id: req.session.id,
    },
    data: {
      password_hash: hashPassword(newPassword),
    },
  });

  return res.status(200).send("Password updated");
}
