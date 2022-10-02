import { Box, Stack, Text, Group, ActionIcon } from "@mantine/core";
import { HiUserCircle } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import prisma from "../../lib/prisma";

import { useMantineTheme } from "@mantine/core";
import { useMediaQuery, useReducedMotion } from "@mantine/hooks";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { PON, User, Request } from "@prisma/client";
import { statusToColor } from "../../lib/color";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (
      (await prisma.user.count({
        where: { id: req.session.id, role: "DESIGNATED_OFFICER" },
      })) === 0
    ) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const requests = await prisma.request.findMany({
      where: { pon: null },
      include: { requestedBy: true },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: req.session.id,
      },
      include: {
        issuedPons: {
          where: { issuedById: req.session.id },
          orderBy: { issued_at: "desc" },
          include: { request: { include: { requestedBy: true } } },
        },
      },
    });

    if (!user) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user,
        requests,
      },
    };
  },
  sessionOptions
);

export default function Dashboard(props: {
  user: User & {
    issuedPons: (PON & {
      request: Request & {
        requestedBy: User;
      };
    })[];
  };
  requests: (Request & { requestedBy: User })[];
}) {
  const {
    requests,
    user: { issuedPons, ...user },
  } = props;
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
  );
  const isLaptop = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.lg}px)`
  );
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

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

  async function issuePon(id: number) {
    const result = await fetch("/api/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: id,
      }),
    });

    if (result.ok) {
      location.reload();
    }
  }

  return (
    <Box className="flex relative items-center justify-center py-20">
      <Stack sx={{ width: isMobile ? "280px" : "450px" }}>
        <Group position="apart">
          <Stack spacing={2}>
            <Text className="font-bold text-3xl"> Hello </Text>
            <Text className="font-bold text-3xl"> {user.firstName} </Text>
          </Stack>

          <Link href="/account" passHref>
            <HiUserCircle size={50} className="w-20 text-gray-700 hover:text-gray-900 cursor-pointer duration-100" />
          </Link>
        </Group>

        <Text className="text-3xl font-bold pt-4">Pending: </Text>
        {requests?.map((request, index) => (
          <Box
            key={request.requestedBy.username}
            onClick={async () => {
              if (confirm(`Issue PON for request #${request.id}?`)) {
                issuePon(request.id);
              }
            }}
          >
            <Group
              position="apart"
              className="rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150 cursor-pointer"
              sx={{ backgroundColor: "#FFFBFE" }}
            >
              <Stack spacing={1} className="font-bold">
                <Text>REQ</Text>
                <Text sx={{ color: random_rgba() }}>#{request.id}</Text>
              </Stack>

              <Stack spacing={1}>
                <Text>User: {request.requestedBy.username}</Text>
                <Group spacing={4}>
                  <Text>Status: </Text>
                  <Text sx={{ color: statusToColor["REQUESTED"] }}>
                    {"REQUESTED"}
                  </Text>
                </Group>
              </Stack>

              <ActionIcon>
                <MdArrowForwardIos />
              </ActionIcon>
            </Group>
          </Box>
        ))}

        <hr className="my-8 h-px bg-gray-200 border-1 dark:bg-gray-700" />

        <Text className="text-3xl font-bold pt-4">Recently Issued: </Text>
        {issuedPons?.map((pon, index) => (
          <Link key={pon.id} href={`/pon/${pon.id}`} passHref>
            <Group
              position="apart"
              className=" rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150"
              sx={{ backgroundColor: "#FFFBFE" }}
            >
              <Stack spacing={1} className="font-bold">
                <Text>PON</Text>
                <Text sx={{ color: random_rgba() }}>#{pon.id}</Text>
              </Stack>

              <Stack spacing={1}>
                <Text>User: {pon.request.requestedBy.username}</Text>
                <Group spacing={4}>
                  <Text>Status: </Text>
                  <Text sx={{ color: statusToColor[pon.status] }}>
                    {pon.status}
                  </Text>
                </Group>
              </Stack>

              <ActionIcon>
                <MdArrowForwardIos />
              </ActionIcon>
            </Group>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
