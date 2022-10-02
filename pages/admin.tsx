import { GetServerSidePropsContext } from "next";
import prisma from "../lib/prisma";
import {
  Button,
  ActionIcon,
  Group,
  Box,
  Text,
  PasswordInput,
  Select,
  SegmentedControl,
  TextInput,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import PasswordStrengthMeter from "../components/progressBar";
import { showNotification } from "@mantine/notifications";

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

export declare type EnrolFormData = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_repeat: string;
};

export default function EnrolPage() {
  const router = useRouter();

  const form = useForm<EnrolFormData>({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password_repeat: "",
    },
  });

  async function submitForm(data: EnrolFormData) {
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/");
    } else {
      showNotification({title: "Unable to create an admin", message: (await response?.json()).message, color: "red"});
    }
  }

  return (
    <Box className="h-screen bg-no-repeat relative flex items-center justify-center">
      <Stack sx={{ width: "350px" }}>
        <Text className="text-5xl">Create an </Text>
        <Text className="text-5xl">Admin.</Text>

        <form onSubmit={form.onSubmit((data) => submitForm(data))}>
          <Stack>
            <TextInput
              variant="unstyled"
              sx={{ textDecoration: "none", backgroundColor: "white" }}
              styles={{
                input: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
              }}
              className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
              label="Username"
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <TextInput
              variant="unstyled"
              sx={{ textDecoration: "none", backgroundColor: "white" }}
              styles={{
                input: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
              }}
              className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
              label="First Name"
              placeholder="First Name"
              {...form.getInputProps("first_name")}
            />
            <TextInput
              variant="unstyled"
              sx={{ textDecoration: "none", backgroundColor: "white" }}
              styles={{
                input: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
              }}
              className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
              label="Last Name"
              placeholder="Last Name"
              {...form.getInputProps("last_name")}
            />
            <PasswordInput
              variant="unstyled"
              sx={{ textDecoration: "none", backgroundColor: "white" }}
              styles={{
                innerInput: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
              }}
              className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <PasswordStrengthMeter password={form.values.password} />
            <PasswordInput
              variant="unstyled"
              sx={{ textDecoration: "none", backgroundColor: "white" }}
              styles={{
                innerInput: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                label: { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
              }}
              className="rounded-md border border-solid border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none"
              label="Repeat Password"
              placeholder="Repeat Password"
              {...form.getInputProps("password_repeat")}
            />
          </Stack>
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Stack>
    </Box>
  );
}
