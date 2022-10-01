import { useRouter } from "next/router";

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
import { IoIosArrowForward } from "react-icons/io"
import { default as PSALogo } from "../public/logo.svg"
import Image from "next/image"

export declare type FormData = {
  username: string,
  password: string
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.user) {
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
    console.log(values)
    const result = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (result.ok) {
      router.push("/");
    } else {
      setError(await result.text());
    }
  }

  const handleSubmit = (values: typeof form.values) => {};


  return (
    <Box className="h-screen bg-no-repeat relative flex items-center justify-center">
      <Stack className="">
        <Box sx={{ width: isMobile ? "250px" : "380px" }} className="p-5">
          <Text className="text-3xl" weight="bold">
            Login.
          </Text>

          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            {
              error ? <p className="text-sm text-red-500">{error}</p> : <></>
            }
            <Box className="border-2 border-solid border-white bg-white border-b-black rounded-b-none justify-center rounded-md shadow-sm my-4 mx-auto hover:drop-shadow-md">
              <TextInput
                label="Username"
                placeholder="Input"
                variant="unstyled"
                sx={{ textDecoration: 'none', backgroundColor: 'white'}}
                {...form.getInputProps("username")}
              />
            </Box>

            <Box className="border-2 border-solid border-white bg-white border-b-black rounded-b-none justify-center rounded-md shadow-sm my-4 mx-auto hover:drop-shadow-md">
              <PasswordInput
                label="Password"
                placeholder="Input"
                variant="unstyled"
                sx={{ textDecoration: 'none', backgroundColor: 'white'}}
                {...form.getInputProps("password")}
              />
            </Box>
            <ActionIcon type="submit" size="xl" className="flex items-center justify-center mx-auto pt-4" sx={{backgroundColor: '#F4EFF4'}}>
              <Stack spacing={2} className="hover:bg-gray-200">
              <IoIosArrowForward size={50} color={'black'} />
              <Text className="text-gray-600 mx-auto">Login</Text>
              </Stack>
            </ActionIcon>
          </form>
          
          <Group position="center" className="pt-10">
            <Image src={PSALogo} alt="" height={200} width={300}/>
          </Group>
        </Box>
      </Stack>
    </Box>
  );
}
