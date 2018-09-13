import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
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

class RepositoriesQuery extends Query<GetRepositories, void> {}

const Profile = () => (
  <RepositoriesQuery query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />
      }
      
      const { viewer } = data;

      if (loading || !viewer) { return <Loading /> }

      console.log(viewer)

      return <RepositoryList repositories={viewer.repositories} />

      // return (
      //   <div>
      //     <h3>PROFILE</h3>
      //     <div>{viewer.name} {viewer.login}</div>
      //   </div>
      // )
    }}
  </RepositoriesQuery>
)

export default Profile;