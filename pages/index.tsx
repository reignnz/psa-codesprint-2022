import { Box, Stack, Text, Group, ActionIcon, Button } from "@mantine/core";
import { HiUserCircle } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import prisma from "../lib/prisma";

import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { PON, User, Visibility } from "@prisma/client";
import { createHash } from "crypto";
import { mapToHsl } from "../lib/color";

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
            <Text className="font-bold"> {user?.firstName}! </Text>
          </Stack>

          <HiUserCircle size={50} className="w-20" />
        </Group>

        {
          issuedPons.length > 0 && <>
              <h2>Your PONs</h2>
            {issuedPons.map((pon, index) => (
              <PonRow pon={pon!} key={index} />
            ))}
          </>
        }
        
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
          Request
          {unissuedRequests?.length ? ` (${unissuedRequests?.length})` : ""}
        </Button>

        {sharedPons.length > 0 && (
          <>
            <h2>Shared with you</h2>

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
    <Group
      key={pon?.id}
      position="apart"
      className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150"
      sx={{ backgroundColor: "#FFFBFE" }}
    >
      <Stack spacing={1} className="font-bold">
        <Text>PON</Text>
        <Text sx={{ color: mapToHsl(pon?.id ?? 0) }}>#{pon?.id}</Text>
      </Stack>

      <Stack spacing={1}>
        <Text>Date: {pon?.issued_at.toDateString()}</Text>
        <Text>
          Status:{" "}
          {pon?.isArchived
            ? "ARCHIVED"
            : pon?.isCompleted
            ? "COMPLETED"
            : "ISSUED"}
        </Text>
      </Stack>

      <Link href={`/pon/${pon?.id}`} passHref>
        <ActionIcon>
          <MdArrowForwardIos />
        </ActionIcon>
      </Link>
    </Group>
  );
}
