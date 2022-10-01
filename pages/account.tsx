import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordStrengthMeter from "../components/progressBar";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (!req.session.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          firstName: req.session.user.firstName,
          lastName: req.session.user.lastName,
          username: req.session.user.username,
        },
      };
    }
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

  return (
    <div>
      <div>
        <h1>Account</h1>
        <Button onClick={() => router.push("/api/logout")}>Logout</Button>
      </div>
      <div>
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
            label="First Name"
            placeholder="First Name"
            {...profileForm.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            {...profileForm.getInputProps("lastName")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Update</Button>
          </Group>
        </form>

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

          <TextInput
            label="Current Password"
            placeholder="Current Password"
            {...passwordForm.getInputProps("oldPassword")}
          />
          <TextInput
            label="New Password"
            placeholder="New Password"
            {...passwordForm.getInputProps("newPassword")}
          />
          <PasswordStrengthMeter password={passwordForm.values.newPassword} />
          <TextInput
            label="Repeat New Password"
            placeholder="Repeat New Password"
            {...passwordForm.getInputProps("newPasswordRepeat")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Reset Password</Button>
          </Group>
        </form>
      </div>
    </div>
  );
}
