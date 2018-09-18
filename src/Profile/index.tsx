import * as React from 'react';
import gql from 'graphql-tag';
import { Query, graphql, QueryResult } from 'react-apollo'
import ErrorMessage from '../Error'
import Loading from '../Loading'
import RepositoryList from '../Repository'
import { GetRepositories } from '../__generated__/types'
import { GET_REPOSITORIES_OF_CURRENT_USER } from '../queries'

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

// --- RenderProps method ---
class RepositoriesQuery extends Query<GetRepositories, void> {}

const Profile = () => (
  <RepositoriesQuery query={GET_REPOSITORIES_OF_CURRENT_USER} notifyOnNetworkStatusChange={true}>
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />
      }
      
      const { viewer } = data;

      if (loading && !viewer) {return <Loading /> }

      return <RepositoryList repositories={viewer.repositories} fetchMore={fetchMore} 
            loading={loading}/>
    }}
  </RepositoriesQuery>
)

export default Profile;

// --- HOC method ---
// const Profile = ( {data, loading, error} : QueryResult<GetRepositories> ) => {
//   if (error) {
//     return <ErrorMessage error={error} />
//   }
  
//   const { viewer } = data;

//   if (loading || !viewer) { return <Loading /> }

//   console.log(viewer)

//   return <RepositoryList repositories={viewer.repositories} />
// }

// export default graphql<any>(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);