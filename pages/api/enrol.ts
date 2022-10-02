import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import { EnrolFormData } from "../enrol";
import crypto from "crypto";
import hashPassword from "../../lib/hash";
import prisma from "../../lib/prisma";

export default withIronSessionApiRoute(enrolRoute, sessionOptions);

async function enrolRoute(req: NextApiRequest, res: NextApiResponse) {
  if (
    !(await prisma.user.count({ where: { id: req.session.id, isAdmin: true } }))
  ) {
    return res.status(401).send("Unauthorized");
  }

  const data = (await req.body) as EnrolFormData;

  if (!data.firstName.trim() || !data.lastName.trim()) {
    return res.status(400).send("First name and last name are required");
  }
  if (!data.username.trim()) {
    return res.status(400).send("Username is required");
  }

  const password = crypto.randomBytes(4).toString("hex");
  const hash = hashPassword(password);

  const result = await prisma.user.create({
    data: {
      username: data.username,
      password_hash: hash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    },
  });

  if (result) {
    res.status(200).send(password);
  } else {
    res.status(400).send("Failed to create user");
  }
}
