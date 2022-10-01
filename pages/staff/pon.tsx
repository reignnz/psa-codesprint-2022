import Pon from '../pon/[id]'
import { Stack, Group, Box, Text, ActionIcon } from '@mantine/core'
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi'
import { TiArrowBackOutline } from 'react-icons/ti'
import { AiOutlinePrinter } from 'react-icons/ai'
import { BsShare } from 'react-icons/bs'

export default function DoPon() {
    return (
        <Stack>
            <Pon editable={true}></Pon>
            <Group position="center" className="text-gray-600 pb-10" spacing={20}>
                <ActionIcon className=' bg-white bg-contain rounded-full hover:cursor-pointer' size="xl"><TiArrowBackOutline size={30}/></ActionIcon>
                <ActionIcon className=' bg-white bg-contain rounded-full hover:cursor-pointer' size="xl"><AiOutlinePrinter size={30}/></ActionIcon>
                <ActionIcon className=' bg-white bg-contain rounded-full hover:cursor-pointer' size="xl"><BsShare size={30}/></ActionIcon>
            </Group>
        </Stack>
        
    )
}