import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'



export default function PostByID({history}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        
        <Link href="/">
          <a>Home =></a>
        </Link>

        <div className={styles.grid}>
            <a key={history.id}className={styles.card}>
              <h3>{ history.title }</h3>
              <p>{history.details}</p>
            </a>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetHistory {
        history(id: "1") {
          id
          title
          details  
        }
      }
    `
  });

  return {
    props: {
      history: data.history
    }
  }
}
