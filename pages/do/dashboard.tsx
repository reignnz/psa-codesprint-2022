
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

    const pendingPons = [
        {ponId: '1234', UserId: '12345ABC', Status: 'REQUESTED'},
        {ponId: '1111', UserId: '20004CCD', Status: 'REQUESTED'},
        {ponId: '1222', UserId: '40001SSS', Status: 'REQUESTED'},

    ]

    const issuedPons = [
        {ponId: '1222', UserId: '12345ABC', Status: 'ISSUED'},
        {ponId: '1333', UserId: '20004CCD', Status: 'ISSUED'},
        {ponId: '1444', UserId: '40001SSS', Status: 'ISSUED'},
    ]

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    enum statusToColor {
        REQUESTED = '#0E80EACC',
        ISSUED = '#430198CC',
        PENDING = '#EA9F0ECC',
        SIGNED = '#439801CC',
        VERIFIED = '#90730ACC'
    }

    
    return (
        <Box className="flex relative items-center justify-center py-20">
            <Stack sx={{width: isMobile ? '280px' : '450px'}}>
                <Group position="apart">
                    <Stack spacing={2}>
                        <Text className="font-bold text-3xl"> Hello </Text>
                        <Text className="font-bold text-3xl"> Yu Dong! </Text>
                    </Stack>
                    
                    <HiUserCircle size={50} className="w-20"/>
                </Group>

                <Text className="text-3xl font-bold pt-4">Pending: </Text> 
                {pendingPons.map((pon, index) => (
                    <Link key={pon.ponId} href="/pon" passHref>
                    <Group position="apart" className=" rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150" sx={{backgroundColor: '#FFFBFE'}}>
                    <Stack spacing={1} className="font-bold">
                        <Text>PON</Text>
                        <Text sx={{color: random_rgba()}}>#{pon.ponId}</Text>
                    </Stack>

                    <Stack spacing={1}>
                        <Text>User: {pon.UserId}</Text>
                        <Group spacing={4}><Text>Status: </Text><Text sx={{color: statusToColor['REQUESTED']}}>{pon.Status}</Text></Group>
                    </Stack>   

                    <ActionIcon><MdArrowForwardIos /></ActionIcon>
                                    
                    </Group>
                    </Link>
                ))}

                <hr className="my-8 h-px bg-gray-200 border-1 dark:bg-gray-700" />

                <Text className="text-3xl font-bold pt-4">Recently Issued: </Text> 
                {issuedPons.map((pon, index) => (
                    <Link key={pon.ponId} href="/pon" passHref>
                    <Group position="apart" className=" rounded-2xl drop-shadow-sm p-5 hover:shadow-md duration-150" sx={{backgroundColor: '#FFFBFE'}}>
                    <Stack spacing={1} className="font-bold">
                        <Text>PON</Text>
                        <Text sx={{color: random_rgba()}}>#{pon.ponId}</Text>
                    </Stack>

                    <Stack spacing={1}>
                        <Text>User: {pon.UserId}</Text>
                        <Group spacing={4}><Text>Status: </Text><Text sx={{color: statusToColor['ISSUED']}}>{pon.Status}</Text></Group>
                    </Stack>   

                    <ActionIcon><MdArrowForwardIos /></ActionIcon>
                                    
                    </Group>
                    </Link>
                ))}


                
            </Stack>
        </Box>

    )
}