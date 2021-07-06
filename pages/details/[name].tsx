import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

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
              diameter
              climate
              gravity
              terrain
              population
          }
      } 
  }
}
`

const PersonDetails = ({ QueryData} : any) => {
  const router = useRouter()
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
                 <dl>
                    <dt>Name  </dt>
                    <dd>
                      {results.homeworld.name}
                    </dd>
                    
                    <dt>Diameter</dt>
                    <dd>{results.homeworld.diameter}</dd>
                    
                    <dt>Climate</dt>
                    <dd>{results.homeworld.climate}</dd>
                    
                    <dt>Gravity</dt>
                    <dd>{results.homeworld.gravity}</dd>
                    
                    <dt>Terrain</dt>
                    <dd>{results.homeworld.terrain}</dd>
                    
                    
                    <dt>Population</dt>
                    <dd>{results.homeworld.population}</dd>
                </dl>
                </div>
            ))

            }
          </main>


            <footer className={styles.footer}>
              
                <a className={styles.btn} onClick={() => router.back()}>

                <h5>&larr;Go Back</h5>
                </a>
                
              
            </footer>
        </div>
    )
}

export default PersonDetails
