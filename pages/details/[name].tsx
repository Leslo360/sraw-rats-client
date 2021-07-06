import React from 'react'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import Link from "next/link"
import styles from '../../styles/Home.module.css'
import Head from 'next/head'


export async function getServerSideProps(context : any) {

    return {
      props : {
        QueryData: context.query
      }
    }
}

const getPersonDetails =  gql`
query getPersonDetails($name : String!){
  getPerson(name: $name ) {
      results {
          name
          height
          mass
          hair_color
          skin_color
          eye_color
          birth_year
          gender
          homeworld {
              name
              rotation_period
              orbital_period
              diameter
              climate
              gravity
              terrain
              surface_water
              population
          }
      } 
  }
}
`

const PersonDetails = ({ QueryData} : any) => {
  const {data, loading, error  } = useQuery(getPersonDetails, {
    variables : {
      name : QueryData.name
    }
  })

  if(loading) return <h1  className={styles.container}>Loading DATA...</h1>
  if(error) console.error(error);

  return (
        <div className={styles.container}>
          <Head>
        <title>{ QueryData.name  }</title>
        
        <meta name="description" content="Know your Star Wars Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <main className={styles.main}>

            {
                data.getPerson.results.map((results: any) => (
                    <div key={results.name}>
                <h1>{results.name}</h1>
                <br/>
                <p>Height : {results.height}</p>
                <p>Mass : {results.mass}</p>
                <p>Hair Color : {results.hair_color}</p>
                <p>Skin Color : {results.skin_color}</p>
                <p>Eye Color : {results.eye_color}</p>
                <p>Birth Year : {results.birth_year}</p>
                <p>Gender : {results.gender}</p>
                <h4>Homewolrd</h4>
                 <ul>
                    <li>Name :  {results.homeworld.name}</li>
                    <li>Rotation Period :  {results.homeworld.rotation_period}</li>
                    <li>Orbital Period :  {results.homeworld.orbital_period}</li>
                    <li>Diameter :  {results.homeworld.diameter}</li>
                    <li>Climate :  {results.homeworld.climate}</li>
                    <li>Gravity :  {results.homeworld.gravity}</li>
                    <li>Terrain :  {results.homeworld.terrain}</li>
                    <li>Surface Water :  {results.homeworld.surface_water}</li>
                    <li>Population :  {results.homeworld.population}</li>
                </ul>
                </div>
            ))

            }
          </main>


            <footer className={styles.footer}>
              <Link href="/">
                <a >

                <h5>&larr;Go Back</h5>
                </a>
                
              </Link>
            </footer>
        </div>
    )
}

export default PersonDetails
