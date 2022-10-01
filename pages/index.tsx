import { Box, Stack, Text, Group, ActionIcon, Button } from "@mantine/core";
import { HiUserCircle } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import prisma from "../lib/prisma"

import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { User } from "@prisma/client";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (!req.session.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
        include: {
          requests: {
            where: { ponId: null },
          },
        },
      });
      console.log(user);
      return {
        props: {
          ...user,
        },
      };
    }
  },
  sessionOptions
);

export default function Dashboard(user: (User & { requests: Request[] }) | null) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
  );
  const isLaptop = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.lg}px)`
  );
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

  const pons = [
    { ponId: "1234", Date: "2018-10-10", Status: "Open" },
    { ponId: "1111", Date: "2019-10-10", Status: "Closed" },
    { ponId: "1222", Date: "2020-10-10", Status: "In Progress" },
  ];

  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  }

  return (
    <Box className="flex relative items-center justify-center py-20">
      <Stack sx={{ width: isMobile ? "280px" : "450px" }}>
        <Group position="apart">
          <Stack spacing={2}>
            <Text className="font-bold text-3xl"> Hello, </Text>
            <Text className="font-bold"> {user?.firstName}! </Text>
          </Stack>

          <HiUserCircle size={50} className="w-20" />
        </Group>

        {pons.map((pon, index) => (
          <Group
            key={pon.ponId}
            position="apart"
            className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150"
            sx={{ backgroundColor: "#FFFBFE" }}
          >
            <Stack spacing={1} className="font-bold">
              <Text>PON</Text>
              <Text sx={{ color: random_rgba() }}>#{pon.ponId}</Text>
            </Stack>

            <Stack spacing={1}>
              <Text>Date: {pon.Date}</Text>
              <Text>Status: {pon.Status}</Text>
            </Stack>

            <Link href="/pon" passHref>
              <ActionIcon>
                <MdArrowForwardIos />
              </ActionIcon>
            </Link>
          </Group>
        ))}

        <Button
          onClick={async () => {
            const result = await fetch("/api/request", {
              method: "post",
            });

            if (result.ok) {
              location.reload();
            }
          }}
        >
          Request{user?.requests.length ? ` (${user?.requests.length})` : ""}
        </Button>
      </Stack>
    </Box>
  );
}
