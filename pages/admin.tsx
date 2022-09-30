import { GetServerSidePropsContext } from "next";
import prisma from "../lib/prisma";

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
  return (
    <form method="post" action="api/admin">
      <input type="text" name="first_name" placeholder="First Name" />
      <input type="text" name="last_name" placeholder="Last Name" />
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <input type="password" name="password_repeat" placeholder="Password" />
      <input type="submit" value="Create Admin" />
    </form>
  );
}
