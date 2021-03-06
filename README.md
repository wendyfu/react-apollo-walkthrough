# react-apollo-walkthrough

A `Typescript`-ed companion project for [A complete React with Apollo and GraphQL Tutorial](https://www.robinwieruch.de/react-graphql-apollo-tutorial).

This repo contains:
* Download schema and generate typing
* Query GraphQL data
* Mutate GraphQL data
* Update Local State
* Optimistic UI
* Render Props vs HOC
* Pagination
* Filtering (Client and Server)
* Data Prefetching

## Prerequisite

* `git clone https://github.com/wendyfu/react-apollo-walkthrough.git`
* `cd react-apollo-walkthrough`
* Add a `.env` file, add a variable named `GITHUB_PERSONAL_ACCESS_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
Get your Github Personal Access Tokens [here](https://github.com/settings/tokens).
* `npm install`
* `npm start`
* visit `http://localhost:3000`

## About React-Apollo
* Connect React with Apollo Client
* `<ApolloProvider>` Component: use as a composing component around `<App>` component. It uses React's Context API to pass Apollo Client through Application

## Download schema and generate typing
Generate typing automatically from the provided schema:
Add these scripts to your `package.json`:

`"schema": "apollo-codegen introspect-schema https://api.github.com/graphql --output ./src/schema.json --header 'Authorization: Bearer qwertyuiop'",`

`"types": "apollo-codegen generate ./src/**/queries.ts --addTypename --schema ./src/schema.json --target typescript --output ./src/__generated__/types.ts"`

(*) `queries.ts` contains your GraphQL query.

## GraphQL Query with Apollo Client in React
* `<Query>` component takes query as a prop and executes this query when its rendered. It also uses React's render props pattern.
* See commit [31d891](https://github.com/wendyfu/react-apollo-walkthrough/commit/31d89116541f8b0b00e53668334ace71428dd671)
* [Query documentation](https://www.apollographql.com/docs/react/essentials/queries.html)

## GraphQL Mutation with Apollo Client in React
* `<Mutation>` component is declarative, executed when the provided mutating function is used in an interactive element (e.g. Button) and when you call a function which is provided as an argument in the render props child function.
* See commit [c54d22](https://github.com/wendyfu/react-apollo-walkthrough/commit/c54d2214f441105eaf343d1238177a4849ca7ab1) and commit [d474cf](https://github.com/wendyfu/react-apollo-walkthrough/commit/d474cfd97cb4afbbc1c70bc1ab05dfa990820488) for Mutation triggered by Button click
* See commit [82ba41](https://github.com/wendyfu/react-apollo-walkthrough/commit/82ba4139de9052939c6fe678a07d7196ab90e7c9) for Mutation triggered by Dropdown change
* [Mutation documentation](https://www.apollographql.com/docs/react/essentials/mutations.html)

## Local State Management with Apollo Client in React
* Apollo Client's cache updates local state when the information is provided in the Mutation result
* Apollo Client's cache needs help when updating other information which is not provided in the Mutation result
* Apollo Client Cache normalizes and stores the queried data. The normalization of the data structure makes it possible to retrieve entities by their identifier and their `__typename` meta field,
* See commit [3866fd](https://github.com/wendyfu/react-apollo-walkthrough/commit/3866fd578052a5d668dd840e0082d4292eb957dc)
* [Local State Management Documentation](https://www.apollographql.com/docs/react/essentials/local-state.html)

## Implement Optimistic UI
* Use `optimisticResponse` prop
* Pass an object that you would expect as a result from a successful mutation
* It should be the same result which you can access as argument in the function that it passed to the `update` prop of the `Mutation` component
* See commit [10748b](https://github.com/wendyfu/react-apollo-walkthrough/commit/10748bbbb629ca2bf74281c6fefe5304d2bed2c5)
* [Optimistic UI Documentation](https://www.apollographql.com/docs/react/features/optimistic-ui.html)

## RenderProps vs HOC
* See commit [972c07](https://github.com/wendyfu/react-apollo-walkthrough/commit/972c07c5fe94f1516305980d1f183a4ed0a5a35f)

## Pagination
* [Pagination Documentation](https://www.apollographql.com/docs/react/features/pagination.html)
* See commit [2d3213](https://github.com/wendyfu/react-apollo-walkthrough/commit/2d3213cf932342000293a4384f449faaa72415a5)

## Filtering
* Client-side filtering: see commit [725d41](https://github.com/wendyfu/react-apollo-walkthrough/commit/725d41198aa82ec3f4241773bb0a62142957d3c1)
* Server-side filtering: see commit [e33873](https://github.com/wendyfu/react-apollo-walkthrough/commit/e338739befb42f93d168350616e59e01dbc102be)

## Data Prefetching
* See commit [c63c4d](https://github.com/wendyfu/react-apollo-walkthrough/commit/c63c4dd7e4ca9c22c10fa4e75b807d2001e2f217)
* [Prefetching data documentation](https://www.apollographql.com/docs/react/features/performance.html#prefetching)
