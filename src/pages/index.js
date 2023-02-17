import Link from 'next/link'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to the Job Offers Project!</title>
        <meta name="description" content="Jobs project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Welcome to the Job Offers Project!</h1>
        <Link href="/test/jobs">
          <button>Go To Project</button>
       </Link>
      </main>
    </>
  )
}
