import Link from 'next/link'
import { Box, Text, Stack } from '@mantine/core'
import { TiArrowBackOutline } from 'react-icons/ti'

export default function Custom404() { 
    return (
        <Box className="flex relative justify-center items-center py-40">
            <Stack>
                <Text className="text-6xl font-bold mx-auto mb-6">404</Text>
                <Text className="text-xl mx-auto">Sorry the page you request cannot be found :( </Text>
                <Text className="text-xl mx-auto"> Click the icon below to go back to the home page</Text>
                <Link href="/"><TiArrowBackOutline className="mx-auto hover:cursor-pointer hover:bg-white hover:rounded-full" size={40}/></Link>
            </Stack>
        </Box>
    )
}