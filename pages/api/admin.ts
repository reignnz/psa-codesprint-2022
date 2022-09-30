import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
    const {
      username,
      password,
      password_repeat: passwordRepeat,
      first_name: firstName,
      last_name: lastName,
    } = req.body;

    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First and last name are required" });
    }

    if (zxcvbn(password).score < 3) {
      return res.status(400).json({
        message:
          "Password is too weak. Please use a stronger password with at least 3 of the following: uppercase, lowercase, numbers, and symbols",
      });
    }

    const hash = bcrypt.hashSync(password, 10);

    const result = await prisma.admin.create({
      data: {
        user: {
          create: {
            username,
            password_hash: hash,
            firstName,
            lastName,
          },
        },
      },
    });

    if (result) {
      return res.redirect("/");
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
