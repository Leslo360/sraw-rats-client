import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const  client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://blooming-mesa-27666.herokuapp.com/graphql"
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
