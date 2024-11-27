import { ApolloProvider } from '@apollo/client'
import Form from './components/form'
import { client } from './utils/graphql-fetch'

function App() {
  return (
    <ApolloProvider client={client}>
      <Form />
    </ApolloProvider>
  )
}

export default App
