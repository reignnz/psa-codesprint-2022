import Pon from '../pon/[id]'
import { Stack, Group, Text } from '@mantine/core'
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi'
import { TiArrowBackOutline } from 'react-icons/ti'

export default function DoPon() {
    return (
        <Stack>
            <Pon editable={false}></Pon>
            <Group spacing={20} position="center" >
                <Group className="bg-red-800 bg-contain rounded-full text-white px-8 py-3 hover:cursor-pointer" onClick={() => console.log('rej')}><HiOutlineX className='text-white'/><Text>Reject</Text></Group>
                <Group className="bg-green-400 bg-contain rounded-full text-white px-8 py-3 hover:cursor-pointer" onClick={() => console.log('issued')}><HiOutlineCheck className='text-white'/><Text>Issue</Text></Group>
            </Group>
            <Group className="bg-contain rounded-full text-white px-8 py-3 mx-auto mb-4 hover:cursor-pointer" onClick={() => console.log('back')} sx={{backgroundColor: '#6750A496'}} position="center"><TiArrowBackOutline className='text-white'/><Text>Back</Text></Group>
        </Stack>
        
    )
}