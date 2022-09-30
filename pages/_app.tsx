import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box } from '@mantine/core'
import Head from 'next/head'
import Layout from './layout'

import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <> <Head><title>PSA Code Sprint</title></Head> <Layout><Component {...pageProps} /></Layout> </>
}

export default MyApp
