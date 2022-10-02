import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box } from '@mantine/core'
import Head from 'next/head'
import Layout from './layout'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <><NotificationsProvider><Head><title>PSA Code Sprint</title></Head> <Layout><Component {...pageProps} /></Layout></NotificationsProvider>  </>
}

export default MyApp
