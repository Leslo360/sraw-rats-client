import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {  gql, useQuery } from '@apollo/client'
import Link from "next/link"
import { useState } from 'react'

const getData = gql`
  query NextPage($next : Int!){
    getNextPage(page: $next) {
      next
      results {
        name
      }
    }
  }
`

export default function Home() {
  const [pageNum, setPageNum] = useState(1)

  const {data, loading, error  } = useQuery(getData, {
    variables : {
      next : pageNum
    }
  })

  if(loading) return <h1 className={styles.container}>Loading DATA...</h1>
  if(error) console.log(error)
 

  const handleNextPage = () => {
    setPageNum(pageNum + 1)
    console.log(pageNum);
  }
  const handlePrevPage = () => {
    setPageNum(pageNum - 1)
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars Characters</title>
        <link
            rel="preload"
            href="/fonts/StarJedi/Starjedi.ttf"
            as="font"
            crossOrigin=""
          />
        <link
            rel="preload"
            href="/fonts/StarJedi/Starjhol.ttf"
            as="font"
            crossOrigin=""
          />
        <meta name="description" content="Know your Star Wars Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Star Wars
        </h1>

        <p className={styles.description}>
          Do you know the characters ?
        </p>

        <div className={styles.grid}>
          {
            data.getNextPage.results.map((result : any, index : number) => (
                <Link key={index}  href={"/details/" + (result.name) }>
                  <a className={styles.card}>
                    <h2>{result.name} </h2>
                    <em>Details&rarr;</em>
                  </a>
                </Link>
              )
            )
          }
        </div>
      </main>

      <footer className={styles.footer}>

        {
          pageNum < 8 &&

        <a onClick={handleNextPage} className={styles.btn}>
          <h5>Next &rarr;</h5>
        </a>
        }

        {
          pageNum > 1 && 
          <a onClick={handlePrevPage} className={styles.btn}>
            <h5>&larr;Back </h5>
          </a>
        }

      </footer>
    </div>
  ) 
}