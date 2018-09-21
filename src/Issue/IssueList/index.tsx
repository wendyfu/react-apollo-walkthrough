import * as React from 'react'
import { Query, QueryResult, ApolloConsumer } from 'react-apollo';
import { withState } from 'recompose';

import './style.css'
import { GET_ISSUES_OF_REPOSITORY } from '../../queries';
import { GetIssuesOfRepository, GetIssuesOfRepository_repository, GetIssuesOfRepository_repository_issues } from '../../__generated__/types'
import ErrorMessage from '../../Error';
import Loading from '../../Loading';
import IssueItem from '../IssueItem'
import { ButtonUnobtrusive } from '../../Button';
import { ApolloClient } from 'apollo-client';

export enum ISSUE_STATES {
  NONE = "NONE",
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

const TRANSITION_LABELS: {[key: string]: string} = {
  [ISSUE_STATES.NONE]: 'Show Open Issues',
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Hide Issues',
};

const TRANSITION_STATE: {[key: string]: string} = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const isShow = ( issueState: string ) => issueState !== ISSUE_STATES.NONE;

interface IssuesProps {
  repositoryOwner: string,
  repositoryName: string,
}

interface IssuesState {
  issueState: ISSUE_STATES,
  onChangeIssueState: (state: string) => ISSUE_STATES
}

type IssuesType = IssuesProps & IssuesState

const Issues = ({ repositoryName, repositoryOwner, issueState, onChangeIssueState } : IssuesType) => {
  return (
    <div className="Issues">
      <IssueFilter repositoryName={repositoryName} repositoryOwner={repositoryOwner}
        onChangeIssueState={onChangeIssueState} issueState={issueState} />

      {isShow(issueState) && (
        <Query query={GET_ISSUES_OF_REPOSITORY}
          variables={{ repositoryOwner, repositoryName, issueState }}>
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
      )}
    </div>
  )
}

const prefetchIssues = (
  client: ApolloClient<any>,
  repositoryName: string,
  repositoryOwner: string,
  issueState: ISSUE_STATES
) => {
  const nextIssueState = TRANSITION_STATE[issueState];

  if (isShow(nextIssueState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner,
        repositoryName,
        issueState: nextIssueState,
      },
    });
  }
}

const IssueFilter = ({ repositoryName, repositoryOwner, onChangeIssueState, issueState }: IssuesType) => (
  <ApolloConsumer >
    {client => (
      <ButtonUnobtrusive
        type="button"
        onClick={() =>
          onChangeIssueState(TRANSITION_STATE[issueState])
        }
        onMouseOver={() => prefetchIssues(
          client,
          repositoryName,
          repositoryOwner,
          issueState
          )}>
        {TRANSITION_LABELS[issueState]}
      </ButtonUnobtrusive>
    )}
  </ApolloConsumer>
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

export default withState<any, ISSUE_STATES, 'issueState', 'onChangeIssueState'>(
  'issueState',
  'onChangeIssueState',
  ISSUE_STATES.NONE,
)(Issues);
