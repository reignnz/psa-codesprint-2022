import { useRouter } from 'next/router'

import { Box, Stack, Text, PasswordInput, TextInput, Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'


export default function LoginPage() {
  const router = useRouter()

  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`
  )
  const isLaptop = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.lg}px)`
  )
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`)

  const form = useForm({
    initialValues: {
      userId: '',
      password: '',
    }
  })

  const handleSubmit = (values: typeof form.values) => {};

  return (
    <Box className="h-screen bg-no-repeat relative flex items-center justify-center">
      <Stack  className="border-2 border-solid border-gray-400 justify-center rounded-md shadow-sm" > 
        <Box sx={{width: isMobile ? "250px" : "380px"}} className="p-5">
          <Text size="lg" weight="bold">
              Welcome Back
          </Text>
          <Text>Login to your account</Text>
          
          
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput label="User Id" placeholder="User Id" {...form.getInputProps('userId')} />


            <PasswordInput
              mt="sm"
              label="Password"
              placeholder="password"
              {...form.getInputProps('password')}
            />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
      
    </Stack>
    </Box>
  )
}
