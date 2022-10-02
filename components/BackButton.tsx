// Make a custom back button component
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { ActionIcon } from "@mantine/core";

export default function BackButton() {
  return (
    <ActionIcon
      type="submit"
      variant="transparent"
      size="xl"
      className="flex items-left justify-left pt-4 mt-4 hover:scale-110 duration-125"
      sx={{}}
    >
      <Link href="/" passHref>
        <IoIosArrowBack size={50} className="" color={"black"} />
      </Link>
    </ActionIcon>
  );
}
