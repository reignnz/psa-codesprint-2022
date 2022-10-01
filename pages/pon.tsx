import { Stack, Group, Text, Box, ActionIcon, TextInput, Button, Image, BackgroundImage, Grid } from '@mantine/core' 
import { HiPencil } from 'react-icons/hi'
import { TiDelete, TiDeleteOutline } from 'react-icons/ti'
import { useState, useRef } from 'react'

export default function Pon() {
    const ponDetails = {
        DriverName: 'Yu Dong',
        DriverPsaPass: '12345ABC',
        VehicleNumber: 'ABC123',
        Items: ['Stick', 'Stones', 'Paper'],
        Images: ['']
    }

    const [editDetails, setEditDetails] = useState(false)
    const [editItems, setEditItems] = useState(false)
    const [editImages, setEditImages] = useState(false)

    const [editableDetails, setEditableDetails] = useState({
        DriverName: ponDetails.DriverName,
        DriverPsaPass: ponDetails.DriverPsaPass,
        VehicleNumber: ponDetails.VehicleNumber
    })

    const [editableItems, setEditableItems] = useState(ponDetails.Items)

    const randomImages = ['https://picsum.photos/seed/picsum/200', 'https://picsum.photos/seed/picsum/201',
        'https://picsum.photos/seed/picsum/100', 'https://picsum.photos/seed/picsum/203', 'https://picsum.photos/seed/picsum/204',
    'https://picsum.photos/seed/picsum/201', 'https://picsum.photos/seed/picsum/201']

    return (
        <Box className="flex relative items-center justify-center py-20">
            <Stack sx={{width: '500px'}}>
                <Group position="apart" className="font-bold">
                    <Stack spacing={2}>
                        <Text> PON </Text>
                        <Text> #12345 </Text>
                    </Stack>
                    <Box className="p-2 m-2" sx={{backgroundColor: "#FFFBFE"}}><Text>ABC Company</Text></Box>
                </Group>
                <Stack className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 relative" sx={{backgroundColor: "#FFFBFE"}}>
                    <ActionIcon className="absolute -top-0 -right-0" onClick={() => setEditDetails(true)}>
                        <HiPencil size={20} />
                    </ActionIcon>

                    <Stack spacing={2} className="border-solid border-gray-600 border-t-0 border-l-0 border-r-0 border-b-2 py-2">
                        <Text className="font-bold text-sm">Driver Name</Text>
                        {editDetails ? <TextInput value={editableDetails.DriverName} onChange={(event) => setEditableDetails({ ...editableDetails, DriverName: event.currentTarget.value})}/> : <Text>{ponDetails.DriverName}</Text>}
                    </Stack> 

                    <Stack spacing={2} className="border-solid border-gray-600 border-t-0 border-l-0 border-r-0 border-b-2 py-2">
                        <Text className="font-bold text-sm">Driver PSA Pass</Text>
                        {editDetails ? <TextInput value={editableDetails.DriverPsaPass} onChange={(event) => setEditableDetails({ ...editableDetails, DriverPsaPass: event.currentTarget.value})} />: <Text>{ponDetails.DriverPsaPass}</Text>}
                    </Stack> 

                    <Stack spacing={2} className="border-solid border-gray-600 border-t-0 border-l-0 border-r-0 border-b-2 py-2">
                        <Text className="font-bold text-sm">Vehicle Number</Text>
                        {editDetails ? <TextInput value={editableDetails.VehicleNumber} onChange={(event) => setEditableDetails({ ...editableDetails, VehicleNumber: event.currentTarget.value})}/> : <Text>{ponDetails.VehicleNumber}</Text>}
                    </Stack> 

                    {editDetails ? 
                    <Group position='right'>
                        <Button onClick={() => {setEditDetails(false)
                        setEditableDetails(ponDetails)}}>Cancel</Button>
                    <Button onClick={() => { 
                        setEditDetails(false)
                        console.log(editableDetails)}}> Submit </Button> </Group> : <></>}

                </Stack>

                <Stack className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 my-5 relative" sx={{backgroundColor: "#FFFBFE"}}>
                    <ActionIcon className="absolute -top-0 -right-0" onClick={() => setEditItems(true)}>
                        <HiPencil size={20}/>
                    </ActionIcon>
                    
                    <Text className="font-bold">Items to bring out</Text>
                    {ponDetails.Items.map((item, index) => (
                        <Group key={index}>
                            {editItems ? <><Text>{index+1}.</Text><TextInput value={editableItems[index]} onChange={(event) => {
                                const newItem = editableItems
                                newItem[index] = event.currentTarget.value
                                console.log(newItem)
                                setEditableItems(newItem)}}></TextInput></> : <Text>{index + 1}. {item}</Text>}
                        </Group>
                    ))}
                    {editItems ? 
                        <Group position='right'>
                            <Button onClick={() => {setEditItems(false)
                            setEditableItems(ponDetails.Items)}}>Cancel</Button>
                        <Button onClick={() => { 
                            setEditItems(false)
                            console.log(editableItems)}}> Submit </Button> </Group> : <></>}
                </Stack>

                <Group className="border-2 border-solid border-gray-400 rounded-2xl drop-shadow-md p-5 my-5" sx={{backgroundColor: "#FFFBFE"}}>
                    <ActionIcon className="absolute -top-0 -right-0" onClick={() => setEditImages(true)}>
                        <HiPencil size={20} />
                    </ActionIcon>
                
                    <Text className="font-bold">Attached Images</Text> 
                    <Group noWrap={true} spacing="xl" className="overflow-scroll">
                        {randomImages.map((image, index) => (
                            <Box key={index} className="w-screen h-screen mx-auto flex">
                                <BackgroundImage src={image} radius="md"><Grid className="relative"><ActionIcon className="absolute top-full right-0" ><TiDeleteOutline /></ActionIcon></Grid></BackgroundImage>
                            </Box>
                        ))}
                   </Group>
                </Group>
            </Stack>

        </Box>
    )
}