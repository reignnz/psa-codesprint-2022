import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useState } from "react";
import { sessionOptions } from "../../lib/session";
import { Role } from "@prisma/client";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (!req.session.user?.isAdmin) {
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

  return (
    <div>
      <h1>Enrol</h1>

      <form onSubmit={form.onSubmit((data) => submitForm(data))}>
        {error ? <p className="text-sm text-red-500">{error}</p> : <></>}
        <SegmentedControl
          {...form.getInputProps("role")}
          data={[
            { label: "Staff", value: "STAFF" },
            { label: "Designated Officer", value: "DESIGNATED_OFFICER" },
            { label: "AETOS", value: "AETOS" },
          ]}
        />
        <TextInput
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
}
