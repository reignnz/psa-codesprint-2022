import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

import {
  Box,
  Stack,
  Text,
  PasswordInput,
  TextInput,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { default as PSALogo } from "../public/logo.svg";
import Image from "next/image";

export declare type FormData = {
  username: string;
  password: string;
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.id) {
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
  },
  sessionOptions
);

export default function LoginPage() {
  const router = useRouter();

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
  );
  const isLaptop = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.lg}px)`
  );
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

  const [error, setError] = useState("");

  const form = useForm<FormData>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  async function submitForm(values: FormData) {
    const result = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (result.ok) {
      router.push("/");
    } else {
      showNotification({
        title: "Login Error",
        message: await result.text(),
        color: "red",
      });
    }
  }

  const handleSubmit = (values: typeof form.values) => {};

  return (
    <Box className="h-screen bg-no-repeat relative flex items-center justify-center">
      <Stack sx={{ width: "350px" }}>
        <Box sx={{ width: isMobile ? "250px" : "380px" }} className="p-5">
          <Text className="text-3xl mb-4" weight="bold">
            Login.
          </Text>
          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            {error ? <p className="text-sm text-red-500">{error}</p> : <></>}
            <Stack>
              <TextInput
                label="Username"
                placeholder="Input"
                variant="unstyled"
                sx={{ textDecoration: "none", backgroundColor: "white" }}
                styles={{
                  input: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                  label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                }}
                className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
                {...form.getInputProps("username")}
              />

              <PasswordInput
                label="Password"
                placeholder="Input"
                variant="unstyled"
                sx={{ textDecoration: "none", backgroundColor: "white" }}
                styles={{
                  input: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                  label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                }}
                className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
                {...form.getInputProps("password")}
              />
            </Stack>

            <ActionIcon
              type="submit"
              variant="transparent"
              size="xl"
              className="flex items-center justify-center mx-auto pt-4 mt-4"
              sx={{}}
            >
              <Stack spacing={2} className="">
                <IoIosArrowForward size={50} color={"black"} />
                <Text className="text-gray-600 mx-auto">Login</Text>
              </Stack>
            </ActionIcon>
          </form>

          <Group position="center" className="pt-10">
            <Image src={PSALogo} alt="" height={200} width={300} />
          </Group>
        </Box>
      </Stack>
    </Box>
  );
}
