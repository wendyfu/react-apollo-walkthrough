import * as React from 'react'
import { Query } from 'react-apollo'
import { GET_REPOSITORIES_OF_ORGANIZATION } from '../queries';
import { GetRepositoriesOfOrganization } from '../__generated__/types';
import ErrorMessage from '../Error';
import Loading from '../Loading';
import RepositoryList from '../Repository';

interface OrganizationRepoProps {
  organizationName?: string
}

class OrganizationRepoQuery extends Query<GetRepositoriesOfOrganization, OrganizationRepoProps> {}

const Organization = ({ organizationName } : OrganizationRepoProps) => (
  <OrganizationRepoQuery query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{organizationName}}
    skip={organizationName === ''}
    notifyOnNetworkStatusChange={true}>
    {
      ({ data, loading, error, fetchMore }) => {
        if (error) {
          return <ErrorMessage error={error} />
        }

        const { organization } = data

        if (loading && !organization) {
          return <Loading />
        }

        return (
          <RepositoryList
            loading={loading}
            repositories={organization.repositories}
            fetchMore={fetchMore}
            entry={'organization'}/>
        )
      }
    }
  </OrganizationRepoQuery>
)

export default Organization

// export default class Organization extends React.Component<OrganizationProps> {
  
//   render() {
//     const { organizationName } = this.props
//     return (
//       <Query query={GET_REPOSITORIES_OF_ORGANIZATION} variables={{ organizationName }} skip={organizationName === ''}>
//         {({ data, loading, error }) => {
  
//         }}
//       </Query>
//     )
//   }
// }
