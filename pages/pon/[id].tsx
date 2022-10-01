import {
  ActionIcon,
  Box,
  Button,
  Image,
  Group,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { HiPencil, HiPlus, HiOutlineX, HiOutlineCheck } from "react-icons/hi";
import prisma from "../../lib/prisma";
import { useMediaQuery } from "@mantine/hooks";
import { withIronSessionSsr } from "iron-session/next";
import { Picture, PON, Signature, Verification } from "@prisma/client";
import { sessionOptions } from "../../lib/session";
import { MdLocationSearching } from "react-icons/md";

interface PonProps {
  editable: boolean;
}

export const getServerSideProps = withIronSessionSsr(
  async ({ req, params }) => {
    const pon = await prisma.pON.findFirst({
      where: {
        OR: [
          { visibilities: { some: { user: { id: req.session.user.id } } } },
          { request: { requestedById: req.session.user.id } },
          { issuedById: req.session.user.id },
        ],
        id: parseInt(params?.id as string, 10),
      },
      include: {
        verification: true,
        signature: true,
        pictures: true,
        request: true,
      },
    });

    if (!pon) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pon,
        editable:
          pon.request.requestedById === req.session.user.id &&
          pon.status === "ISSUED",
      },
    };
  },
  sessionOptions
);

export default function Pon({
  pon,
  editable,
}: PON &
  PonProps & {
    pon: PON & {
      signature: Signature | null;
      verification: Verification | null;
      pictures: Picture[];
    };
  }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
  );

  const [ponDetails, setPonDetails] = useState({
    company_name: pon.company_name,
    driver_name: pon.driver_name,
    driver_pass_number: pon.driver_pass_number,
    vehicle_number: pon.vehicle_number,
    items: pon.item_descriptions.length ? pon.item_descriptions : [""],
    images: pon.pictures.map((picture) => picture.id),
  });

  const [editDetails, setEditDetails] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [editName, setEditName] = useState(false);

  const [editableDetails, setEditableDetails] = useState({
    driver_name: ponDetails.driver_name,
    driver_pass_number: ponDetails.driver_pass_number,
    vehicle_number: ponDetails.vehicle_number,
  });

  const [editableItems, setEditableItems] = useState([...ponDetails.items]);

  const [editedImages, setEditedImages] = useState(
    ponDetails.images.map((image) => {
      return { selected: false, image };
    })
  );

  const [editCompanyName, setEditCompanyName] = useState(ponDetails.company_name);

  async function submitDetails() {
    const result = await fetch(`/api/pon/${pon.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editableDetails),
    });
    if (!result) {
      location.reload();
    }
  }
  async function submitItems() {
    const result = await fetch(`/api/pon/${pon.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editableItems),
    });
    if (!result) {
      location.reload();
    }
  }
  async function submitImages() {
    const result = await fetch(`/api/pon/${pon.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedImages),
    });
    if (!result) {
      location.reload();
    }
  }
  async function submitCompany() {
    await fetch(`/api/pon/${pon.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company_name: editCompanyName }),
    });
  }

  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  }

  const statusToColor = new Map([
    ["REQUESTED", "#0E80EACC"],
    ["ISSUED", "#430198CC"],
    ["PENDING", "#EA9F0ECC"],
    ["SIGNED", "#439801CC"],
    ["VERIFIED", "#90730ACC"],
  ]);

  return (
    <Box className="flex relative items-center justify-center py-20">
      <Stack sx={{ width: isMobile ? "280px" : "600px" }}>
        <Group
          position={isMobile ? `center` : `apart`}
          noWrap
          className="font-bold"
          sx={{ width: isMobile ? "200px" : "600px" }}
        >
          <Stack spacing={1}>
            <Text className="text-lg"> PON </Text>
            {editable == false ? (
              <></>
            ) : (
              <Group className="text-lg">
                {editName ? (
                  <TextInput
                    value={editCompanyName}
                    onChange={(event) => {
                      setEditCompanyName(event.currentTarget.value);
                      submitCompany();
                    }}
                  />
                ) : (
                  <Text>{editCompanyName}</Text>
                )}
                {editName ? (
                  <ActionIcon
                    className="hover:rounded-full"
                    onClick={() => setEditName(false)}
                  >
                    <HiOutlineX size={15} />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    className="hover:rounded-full"
                    onClick={() => setEditName(true)}
                  >
                    <HiPencil size={15} />
                  </ActionIcon>
                )}
              </Group>
            )}
          </Stack>
          <Stack
            className="p-2 m-2 flex justify-center items-center lg:w-1/2"
            spacing={2}
            sx={{ backgroundColor: "#FFFBFE" }}
          >
            <Text
              className="sm:text-md md:text-lg lg:text-3xl"
              sx={{ color: random_rgba() }}
            >
              #{pon.id}
            </Text>
            <Group spacing={2} className="sm:text-sm md:text-sm lg:text-lg">
              <Text>STATUS:</Text>
              <Text sx={{ color: statusToColor.get(pon.status.toString()) }}>
                {pon.status.toString()}
              </Text>
            </Group>
            <Text className="text-xs text-gray-500">
              {`LAST UPDATED ${pon.last_updated_at.toLocaleDateString(
                "en-GB"
              )} ${pon.last_updated_at.toLocaleTimeString("en-GB")}`}
            </Text>
          </Stack>
        </Group>
        <Stack
          className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 relative"
          sx={{ backgroundColor: "#FFFBFE" }}
        >
          {editable == false ? (
            <></>
          ) : editDetails ? (
            <></>
          ) : (
            <ActionIcon
              className="absolute -top-0 -right-0 hover:rounded-full"
              onClick={() => setEditDetails(true)}
            >
              <HiPencil size={20} />
            </ActionIcon>
          )}

          <Stack
            spacing={2}
            className="border-solid border-gray-600 border-t-0 border-l-0 border-r-0 border-b-2 py-2"
          >
            <Text className="font-bold text-sm">Driver Name</Text>
            {editDetails ? (
              <TextInput
                value={editableDetails.driver_name ?? ""}
                onChange={(event) =>
                  setEditableDetails({
                    ...editableDetails,
                    driver_name: event.currentTarget.value,
                  })
                }
              />
            ) : (
              <Text>{ponDetails.driver_name}</Text>
            )}
          </Stack>

          <Stack
            spacing={2}
            className="border-solid border-gray-600 border-t-0 border-l-0 border-r-0 border-b-2 py-2"
          >
            <Text className="font-bold text-sm">Driver PSA Pass</Text>
            {editDetails ? (
              <TextInput
                value={editableDetails.driver_pass_number ?? ""}
                onChange={(event) =>
                  setEditableDetails({
                    ...editableDetails,
                    driver_pass_number: event.currentTarget.value,
                  })
                }
              />
            ) : (
              <Text>{ponDetails.driver_pass_number}</Text>
            )}
          </Stack>

          <Stack
            spacing={2}
            className="border-solid border-gray-600 border-t-0 border-l-0 border-r-0 border-b-2 py-2"
          >
            <Text className="font-bold text-sm">Vehicle Number</Text>
            {editDetails ? (
              <TextInput
                value={editableDetails.vehicle_number ?? ""}
                onChange={(event) =>
                  setEditableDetails({
                    ...editableDetails,
                    vehicle_number: event.currentTarget.value,
                  })
                }
              />
            ) : (
              <Text>{ponDetails.vehicle_number}</Text>
            )}
          </Stack>

          {editDetails ? (
            <Group position="right">
              <Button
                onClick={() => {
                  setEditDetails(false);
                  setEditableDetails(ponDetails);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  setEditDetails(false);
                  setPonDetails((prev) => {
                    return { ...prev, ...editableDetails };
                  });
                  await submitDetails();
                }}
              >
                Submit
              </Button>{" "}
            </Group>
          ) : (
            <></>
          )}
        </Stack>

        <Stack
          className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 my-5 relative"
          sx={{ backgroundColor: "#FFFBFE" }}
        >
          {editable == false ? (
            <></>
          ) : editItems ? (
            <></>
          ) : (
            <ActionIcon
              className="absolute -top-0 -right-0 hover:rounded-full"
              onClick={() => setEditItems(true)}
            >
              <HiPencil size={20} />
            </ActionIcon>
          )}

          <Text className="font-bold">Items to bring out</Text>
          <Stack>
            {editableItems.map((item, index) =>
              editItems ? (
                <Group key={index} noWrap className="flex flex-row">
                  <Text>{index + 1}.</Text>
                  <TextInput
                    value={item}
                    onChange={(event) => {
                      const newItem = editableItems;
                      newItem[index] = event.currentTarget.value;
                      setEditableItems([...newItem]);
                    }}
                  ></TextInput>
                  <ActionIcon
                    onClick={() => {
                      setEditableItems(
                        editableItems.filter((_, idx) => index != idx)
                      );
                    }}
                  >
                    <AiOutlineMinusCircle color="red" />
                  </ActionIcon>
                  {index == editableItems.length - 1 ? (
                    <ActionIcon
                      className="ml-7 border-3 border-gray-400 border-dotted w-2/5 row-auto"
                      onClick={() => {
                        setEditableItems([...editableItems, ""]);
                      }}
                    >
                      <HiPlus />
                    </ActionIcon>
                  ) : (
                    <></>
                  )}
                </Group>
              ) : (
                <Text>
                  {index + 1}. {item}
                </Text>
              )
            )}
          </Stack>
          {editItems ? (
            <Group position="right">
              <Button
                onClick={() => {
                  setEditItems(false);
                  setEditableItems(ponDetails.items);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setEditItems(false);
                  setPonDetails((prev) => {
                    return { ...prev, items: editableItems };
                  });
                  setEditableItems(editableItems.filter(i => i));
                  submitItems();
                }}
              >
                Submit
              </Button>{" "}
            </Group>
          ) : (
            <></>
          )}
        </Stack>

        <Box
          className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 my-5"
          sx={{ backgroundColor: "#FFFBFE" }}
        >
          {editable == false ? (
            <></>
          ) : editImages ? (
            <></>
          ) : (
            <ActionIcon
              className="absolute -top-0 -right-0 hover:rounded-full"
              onClick={() => setEditImages(true)}
            >
              <HiPencil size={20} />
            </ActionIcon>
          )}

          <Text className="font-bold">Attached Images</Text>
          <Group spacing="xl" className="py-5">
            {editImages ? (
              <ActionIcon
                className="border-3 border-dotted border-gray-400"
                sx={{ width: "80px", height: "80px" }}
              >
                <HiPlus />
              </ActionIcon>
            ) : (
              <></>
            )}
            {editedImages.map((image, index) => (
              <Image
                key={index}
                src={image.image}
                alt={image.image.replace("0", "1")}
                radius="md"
                width={80}
                height={80}
                onClick={() => {
                  setEditedImages([
                    ...editedImages.map((image, idx) => {
                      if (index == idx) {
                        image.selected = !image.selected;
                      }
                      return image;
                    }),
                  ]);
                }}
                sx={{ opacity: image.selected ? 0.7 : 1 }}
                className="hover:cursor-pointer hover:opacity-60"
              />
            ))}
          </Group>
          {editImages ? (
            <Group position="right">
              <ActionIcon
                className="border border-solid border-r-20 rounded-full"
                sx={{ backgroundColor: "#F4EFF4" }}
                onClick={() => {
                  setEditImages(false);
                  setEditedImages([
                    ...ponDetails.images.map((image) => {
                      return { selected: false, image: image };
                    }),
                  ]);
                }}
              >
                <HiOutlineX />
              </ActionIcon>

              <ActionIcon
                className="border border-solid border-r-20 rounded-full"
                sx={{ backgroundColor: "#F4EFF4" }}
                onClick={() => {
                  setEditImages(false);
                  setEditedImages((prev) =>
                    prev.filter((image) => !image.selected)
                  );
                  setPonDetails((prev) => {
                    return {
                      ...prev,
                      images: editedImages
                        .filter((image) => !image.selected)
                        .map((image) => image.image),
                    };
                  });
                  submitImages();
                }}
              >
                <HiOutlineCheck />
              </ActionIcon>
            </Group>
          ) : (
            <></>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
