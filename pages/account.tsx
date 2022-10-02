import { Button, Group, PasswordInput, TextInput, Box, Text, Stack, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordStrengthMeter from "../components/progressBar";
import { sessionOptions } from "../lib/session";
import BackButton from "../components/BackButton";
import prisma from "../lib/prisma";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (!req.session.id) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.session.id,
      },
    });

    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    };
  },
  sessionOptions
);

export declare type ProfileFormData = {
  username: string;
  firstName: string;
  lastName: string;
};

export declare type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export default function AccountPage({
  firstName,
  lastName,
  username,
}: {
  firstName: string;
  lastName: string;
  username: string;
}) {
  const router = useRouter();

  const [profileFormError, setProfileFormError] = useState("");
  const [passwordFormError, setPasswordFormError] = useState("");

  const profileForm = useForm<ProfileFormData>({
    initialValues: {
      username,
      firstName,
      lastName,
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    },
  });

  async function submitForm(
    path: string,
    data: ProfileFormData | PasswordFormData
  ) {
    return await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Box className="flex justify-center items-center pt-20  pb-8">
      <Stack sx={{width: isMobile? '260px' : '320px'}}>
        <BackButton></BackButton>
        <Group position="apart">
          <Text className="font-bold text-3xl">Account</Text>
          <Button
            onClick={() => router.push("/api/logout")}
            className="bg-red-500 hover:bg-red-600"
          >
            Log Out
          </Button>
        </Group>
        <form
          onSubmit={profileForm.onSubmit(async (data) => {
            const result = await submitForm("/api/account/update", data);
            if (result.ok) {
              alert("Profile updated");
            }
          })}
        >
          {profileFormError && <p>{profileFormError}</p>}

          <TextInput
            disabled
            label="Username"
            placeholder="Username"
            {...profileForm.getInputProps("username")}
          />
          <TextInput
            disabled
            label="First Name"
            placeholder="First Name"
            {...profileForm.getInputProps("firstName")}
          />
          <TextInput
            disabled
            label="Last Name"
            placeholder="Last Name"
            {...profileForm.getInputProps("lastName")}
          />
        </form>
        <Text className="text-3xl font-bold mt-4">Change your password</Text>
        <form
          onSubmit={passwordForm.onSubmit(async (data) => {
            const result = await submitForm("/api/account/change", data);
            if (result.ok) {
              alert("Password changed successfully");
            } else {
              setPasswordFormError(await result.text());
            }
          })}
        >
          {passwordFormError && <p>{passwordFormError}</p>}

          <PasswordInput
            label="Current Password"
            placeholder="Current Password"
            {...passwordForm.getInputProps("oldPassword")}
          />
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            {...passwordForm.getInputProps("newPassword")}
          />
          <PasswordStrengthMeter password={passwordForm.values.newPassword} />
          <PasswordInput
            label="Repeat New Password"
            placeholder="Repeat New Password"
            {...passwordForm.getInputProps("newPasswordRepeat")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Reset Password</Button>
          </Group>
        </form>
      </Stack>
    </Box>
  );
}
