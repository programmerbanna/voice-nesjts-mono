import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

// GraphQL Query
export const SEARCH_PROFESSIONALS = gql`
  query SearchProfessionals($keyword: String!) {
    searchProfessionals(keyword: $keyword) {
      id
      name
      category
      rating
      subCategory
      zone
      totalAppointment
      areaOfPractice
    }
  }
`
