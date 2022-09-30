import { Stack, Group, Text, Box, ActionIcon } from '@mantine/core' 
import { HiPencil } from 'react-icons/hi'

export default function Pon() {
    return (
        <Box className="flex relative items-center justify-center py-20">
            <Stack sx={{width: '380px'}}>
                <Group position="apart" className="font-bold">
                    <Stack spacing={2}>
                        <Text> Hello! </Text>
                        <Text> Insert Name </Text>
                    </Stack>
                    <Text>ABC Company</Text>
                </Group>

                <Group position="apart" className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 flex w-full">
                    <Group>
                    <Text>Vehicle No.</Text>
                    <Text>hi</Text>
                    </Group> 
                    <ActionIcon>
                        <HiPencil />
                    </ActionIcon>
                </Group>
            </Stack>

        </Box>
    )
}