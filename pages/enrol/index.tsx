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
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useState } from "react";
import { sessionOptions } from "../../lib/session";
import { Role } from "@prisma/client";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import { RiShieldCrossLine } from "react-icons/ri";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (
      (await prisma.user.count({
        where: { id: req.session.id, isAdmin: true },
      })) === 0
    ) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {},
      };
    }
  },
  sessionOptions
);

export declare type EnrolFormData = {
  username: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export default function EnrolPage() {
  const router = useRouter();

  const form = useForm<EnrolFormData>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      role: "STAFF",
    },
  });

  const [error, setError] = useState("");

  async function submitForm(data: EnrolFormData) {
    const response = await fetch("/api/enrol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert(`Enrolment successful. New password: ${await response.text()}`);
      router.push("/enrol");
    } else {
      setError(await response.text());
    }
  }

  const [selectedRole, setSelectedRole] = useState({
    STAFF: true,
    DO: false,
    AETOS: false,
  });

  return (
    <Box className="h-screen bg-no-repeat relative flex items-center justify-center">
      <Stack sx={{ width: "350px" }}>
        <Text className="text-5xl">Create a </Text>
        <Text className="text-5xl">User.</Text>

        <form onSubmit={form.onSubmit((data) => submitForm(data))}>
          {error ? <p className="text-sm text-red-500">{error}</p> : <></>}
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
              {...form.getInputProps("firstName")}
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
              {...form.getInputProps("lastName")}
            />
            <Text className="text-bold">Select a role</Text>
            <Group>
              <Stack
                onClick={() => {
                  setSelectedRole(() => {
                    return {
                      STAFF: true,
                      DO: false,
                      AETOS: false,
                      ADMIN: false,
                    };
                  });
                  form.setFieldValue("role", "STAFF");
                }}
                className="hover:cursor-pointer hover:bg-white rounded-md p-4"
                sx={{ backgroundColor: selectedRole.STAFF ? "white" : "none" }}
              >
                <HiOutlineUser className="mx-auto" size={20} />
                <Text>STAFF</Text>
              </Stack>
              <Stack
                onClick={() => {
                  setSelectedRole(() => {
                    return {
                      STAFF: false,
                      DO: true,
                      AETOS: false,
                      ADMIN: false,
                    };
                  });
                  form.setFieldValue("role", "DESIGNATED_OFFICER");
                }}
                className="hover:cursor-pointer hover:bg-white rounded-md p-4"
                sx={{ backgroundColor: selectedRole.DO ? "white" : "none" }}
              >
                <HiOutlineUsers className="mx-auto" size={20} />
                <Text>D.O.</Text>
              </Stack>
              <Stack
                onClick={() => {
                  setSelectedRole(() => {
                    return {
                      STAFF: false,
                      DO: false,
                      AETOS: true,
                      ADMIN: false,
                    };
                  });
                  form.setFieldValue("role", "AETOS");
                }}
                className="hover:cursor-pointer hover:bg-white rounded-md p-4"
                sx={{ backgroundColor: selectedRole.AETOS ? "white" : "none" }}
              >
                <RiShieldCrossLine className="mx-auto" size={20} />
                <Text>AETOS</Text>
              </Stack>
            </Group>
          </Stack>
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Stack>
    </Box>
  );
}
