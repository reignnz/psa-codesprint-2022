import { Box, Stack, Text, Group, ActionIcon, Button, Tooltip } from "@mantine/core";
import { HiOutlineUser, HiOutlineUsers, HiUserCircle } from "react-icons/hi";
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import prisma from "../lib/prisma";

import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { PON, Role, User, Visibility } from "@prisma/client";
import { mapToHsl, statusToColor } from "../lib/color";
import { RiShieldCrossLine } from "react-icons/ri";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (!req.session.id) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else if (
      await prisma.user.count({
        where: { id: req.session.id, role: "DESIGNATED_OFFICER" },
      })
    ) {
      return {
        redirect: {
          destination: "/do",
          permanent: false,
        },
      };
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.id,
        },
        include: {
          requests: { include: { pon: true } },
          visibilities: {
            include: {
              pon: { include: { request: { include: { requestedBy: true } } } },
            },
          },
        },
      });
      if (user == null) {
        return {
          redirect: {
            destination: "/api/logout",
            permanent: false,
          },
        };
      }
      return {
        props: {
          ...user,
        },
      };
    }
  },
  sessionOptions
);

export default function Dashboard(
  user: User & {
    requests: (Request & {
      pon: PON | null;
    })[];
    visibilities: (Visibility & {
      pon: PON & {
        request: Request & {
          requestedBy: User;
        };
      };
    })[];
  }
) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
  );
  const isLaptop = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.lg}px)`
  );
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

  const unissuedRequests = user?.requests.filter(
    (request) => request.pon === null
  );
  const issuedPons = user?.requests
    .filter((request) => request.pon !== null)
    .map((request) => request.pon);

  const sharedPons = user.visibilities
    .map((visibility) => visibility.pon)
    .filter((pon) => pon.request.requestedBy.id !== user.id);

  return (
    <Box className="flex relative items-center justify-center py-20">
      <Stack sx={{ width: isMobile ? "280px" : "450px" }}>
        <Group position="apart">
          <Stack spacing={2}>
            <Text className="font-bold text-3xl"> Hello, </Text>
            <Group spacing={10}>
              <Text className="font-bold text-3xl"> {user?.firstName}! </Text>
              {user?.role == Role.STAFF ? <HiOutlineUser className="mx-auto" size={20} />:
              user?.role == Role.DESIGNATED_OFFICER ? <HiOutlineUsers className="mx-auto" size={20} /> :
              <RiShieldCrossLine className="mx-auto" size={20} />}
            </Group>
          </Stack>
          <Group spacing={10}>
            {user.isAdmin && (
              <Link href={`/enrol`} passHref>
                <ActionIcon
                  variant="transparent"
                  type="submit"
                  size="xl"
                  className="flex items-center justify-center mx-auto hover:scale-110 duration-150"
                  sx={{}}
                >
                  <BsFillPersonPlusFill className="text-gray-700" size={40} />
                </ActionIcon>
              </Link>
            )}

            <Link href={`/account`} passHref>
              <ActionIcon
                  variant="transparent"
                  type="submit"
                  size="xl"
                  className="flex items-center justify-center mx-auto hover:scale-110 duration-150"
                  sx={{}}
                >
                <HiUserCircle size={50} className="w-20 text-gray-700" />
              </ActionIcon>
            </Link>
          </Group>
        </Group>

        <Text className="text-4xl font-bold mt-6">Your PONs</Text>
        {
          issuedPons.map((pon, index) => (
                <PonRow pon={pon!} key={index} />
              ))
        }
        
        
        <Button variant="subtle" className="text-gray-600 hover:text-violet-100 hover:border-opacity-0 border-gray-700 hover:bg-violet-700 hover:bg-opacity-100 border-2 border-dashed rounded-lg border-opacity-50 duration-150"
          onClick={async () => {
            const result = await fetch("/api/request", {
              method: "post",
            });

            if (result.ok) {
              location.reload();
            }
          }}
        >
          Request
          {unissuedRequests?.length ? ` (${unissuedRequests?.length})` : ""}
        </Button>

        {sharedPons.length > 0 && (
          <>
            <Text className="text-4xl font-bold mt-6">Shared with you</Text>
            {sharedPons.map((pon, index) => (
              <PonRow pon={pon!} key={index} />
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
}

function PonRow({ pon }: { pon: PON }) {
  return (
    <Link href={`/pon/${pon?.id}`} passHref>
    <Group
      key={pon?.id}
      position="apart"
      className="rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150 cursor-pointer"
      sx={{ backgroundColor: "#FFFBFE" }}
    >
      <Stack spacing={1} className="font-bold">
        <Text>PON</Text>
        <Text sx={{ color: mapToHsl(pon?.id ?? 0) }}>#{pon?.id}</Text>
      </Stack>

      <Stack spacing={1}>
        <Text>Date: {pon?.issued_at.toDateString()}</Text>
        <Group spacing={4}>
          <Text>Status:{" "}</Text><Text sx={{color: statusToColor[pon?.status]}}>{pon?.status}</Text>
        </Group>
      </Stack>

        <ActionIcon>
          <MdArrowForwardIos />
        </ActionIcon>
        </Group>

      </Link>
  );
}
