import { GetServerSidePropsContext } from "next";
import prisma from "../lib/prisma";
import React from "react";
import PasswordStrengthMeter from "../components/progressBar";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userCount = await prisma.user.count();

  if (userCount) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function Admin() {
  const [currentPassword, setCurrentPassword] = React.useState<string>("");
  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = event.target.value;
    setCurrentPassword(enteredPassword);
  };

  return (
    <div>
      <form method="post" action="api/admin">
        <input type="text" name="first_name" placeholder="First Name" />
        <input type="text" name="last_name" placeholder="Last Name" />
        <input type="text" name="username" placeholder="Username" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={currentPassword}
          onChange={passwordInputHandler}
        />
        <input type="password" name="password_repeat" placeholder="Password" />
        <input type="submit" value="Create Admin" />
      </form>
      <PasswordStrengthMeter password={currentPassword} />
    </div>
  );
}
