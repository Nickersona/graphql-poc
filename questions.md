## GraphQL questions 

Can we manually batch requests


Need to manually set up apollo provider ,boost doesn't allow batching, need to do this:

```
const batchLink = new BatchHttpLink({
  uri: /graphql,
  batchInterval: 20,
});

const client = new ApolloClient({
  link: batchLink,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',
});
```


Debouncing for 5 seconds probably doesn't happen in graphQL, but we'll queue up mutations to the server
then all fire off at once, which will batch in the same tic.

Some queries (Resizing) will have and an `optimisticResponse` return others We could use refetchQueries to hit and gql function asking if has updated.

Build out a Function which determines if the order has changed for a given set of data
Implentation idea:
  fetch things by order, store a hash of that order, compare against the next state and return bool based on those hashes matching



What happens when it Errors :| Maybe use a `update` function on the query to catch an error state 

Nah seems like there's a whole error handlign thing: Needs more investigation: https://www.apollographql.com/docs/react/features/error-handling/