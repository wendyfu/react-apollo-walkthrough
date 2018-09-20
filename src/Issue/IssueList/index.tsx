import * as React from 'react'
import { Query, QueryResult } from 'react-apollo';

import './style.css'
import { GET_ISSUES_OF_REPOSITORY } from '../../queries';
import { GetIssuesOfRepository, GetIssuesOfRepository_repository, GetIssuesOfRepository_repository_issues } from '../../__generated__/types'
import ErrorMessage from '../../Error';
import Loading from '../../Loading';
import IssueItem from '../IssueItem'
import { ButtonUnobtrusive } from '../../Button';

export enum ISSUE_STATES {
  NONE = "NONE",
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: 'Show Open Issues',
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Hide Issues',
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const isShow = ( issueState: ISSUE_STATES ) => issueState !== ISSUE_STATES.NONE;

interface IssuesProps {
  repositoryOwner: string,
  repositoryName: string
}

class Issues extends React.Component<IssuesProps> {
  state = {
    issueState: ISSUE_STATES.NONE
  }

  onChangeIssueState = ( nextIssueState: ISSUE_STATES ) => {
    this.setState({ issueState: nextIssueState });
  };

  render() {
    const { repositoryName, repositoryOwner } = this.props
    const { issueState } = this.state

    return (
      <div className="Issues">
        <ButtonUnobtrusive
          type="button"
          onClick={() =>
            this.onChangeIssueState(TRANSITION_STATE[issueState])
          }>
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>

        {isShow(issueState) && (
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

                const filteredRepository: GetIssuesOfRepository_repository = {
                  __typename: "Repository",
                  issues: {
                    __typename: "IssueConnection",
                    edges: repository.issues.edges.filter(issue => {                      
                      return issue.node.state === issueState.toString()
                    })
                  }
                }

                if (!filteredRepository.issues.edges.length) {
                  return <div className="IssueList">No issues ...</div>;
                }
        
                return <IssueList issues={filteredRepository.issues} />;
              }
            }
          </Query>
        )}
      </div>
    )
  }
}

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
