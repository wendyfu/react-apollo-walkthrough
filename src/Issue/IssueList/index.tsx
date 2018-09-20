import * as React from 'react'
import { Query, QueryResult } from 'react-apollo';

import './style.css'
import { GET_ISSUES_OF_REPOSITORY } from '../../queries';
import { GetIssuesOfRepository, GetIssuesOfRepository_repository, GetIssuesOfRepository_repository_issues } from '../../__generated__/types'
import ErrorMessage from '../../Error';
import Loading from '../../Loading';
import IssueItem from '../IssueItem'

interface IssuesProps {
  repositoryOwner: string,
  repositoryName: string
}

// class IssuesQuery extends Query<GetIssuesOfRepository, IssuesProps> {}

const Issues = ( { repositoryName, repositoryOwner } : IssuesProps) => (
  <div className="Issues">
    <Query query={GET_ISSUES_OF_REPOSITORY}
      variables={{ repositoryOwner, repositoryName }}>
      {
        ({ data, loading, error }: QueryResult<GetIssuesOfRepository>) => {
          if (error) {
            return <ErrorMessage error={error} />
          }

          const { repository } = data;

          if (loading && !repository) {
            return <Loading />;
          }

          if (!repository.issues.edges.length) {
            return <div className="IssueList">No issues ...</div>;
          }
  
          return <IssueList issues={repository.issues} />;
        }
      }
    </Query>
  </div>
)

interface IssueListProps {
  issues: GetIssuesOfRepository_repository_issues
}

const IssueList = ( props : IssueListProps) => (
  <div className="IssueList">
    {props.issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
)

export default Issues
