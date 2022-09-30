
import { Box, Stack, Text, Group, ActionIcon } from '@mantine/core'
import { HiUserCircle } from "react-icons/hi"
import { MdArrowForwardIos } from "react-icons/md"
import Link from "next/link"

import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function Dashboard() {
    const theme = useMantineTheme()
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
    const isTablet = useMediaQuery(
        `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
    )
    const isLaptop = useMediaQuery(
        `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.lg}px)`
    )
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`)

    return (
        <Box className="flex relative items-center justify-center py-20">
            <Stack sx={{width: isMobile ? '280px' : '450px'}}>
                <Group position="apart">
                    <Stack spacing={2}>
                        <Text className="font-bold"> Hello! </Text>
                        <Text className="font-bold"> Insert Name </Text>
                    </Stack>
                    
                    <HiUserCircle size={50} className="w-20"/>

                </Group>
        
                <Group position="apart" className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5">
                    <Stack spacing={1} className="font-bold">
                        <Text>PON</Text>
                        <Text>#1234</Text>
                    </Stack>

                    <Stack spacing={1}>
                        <Text>Title: {}</Text>
                        <Text>Date: {}</Text>
                        <Text>Status: {}</Text>
                    </Stack>   

                    <Link href="/pon" passHref><ActionIcon><MdArrowForwardIos /></ActionIcon></Link>
                                    
                </Group>
            </Stack>
        


        </Box>

    )
}