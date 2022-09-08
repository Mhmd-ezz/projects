import { Apollo } from 'apollo-angular';



let apolloClient: Apollo

export const setApolloClient = (apollo: Apollo) => {
  apolloClient = apollo;
}

export const getApolloClient = () => { return apolloClient };


