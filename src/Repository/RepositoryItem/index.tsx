import * as React from 'react';
import gql from 'graphql-tag'

import { Mutation } from 'react-apollo'
import Button from '../../Button'
import Link from '../../Link';
import { GetRepositories_viewer_repositories_edges_node, SubscriptionState } from '../../__generated__/types'

import '../style.css';

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION_REPOSITORY = gql`
  mutation($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

const RepositoryItem = ( node: GetRepositories_viewer_repositories_edges_node ) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>  
        <Link href={node.url}>{node.name}</Link>
      </h2>
      <div>
        { !node.viewerHasStarred ? (
          <Mutation mutation={STAR_REPOSITORY} variables={{ id: node.id }}>
            {(addStar, {data, loading, error}) => (
              <Button
                customClassName={'RepositoryItem-title-action'}              
                onClick={(e) => addStar()}
                color='black'>
                {!loading ? (`${node.stargazers.totalCount} Star`) : ('Loading..')}
              </Button>
            )}
          </Mutation>
        ) : (
          <Mutation mutation={REMOVE_STAR_REPOSITORY} variables={{ id: node.id }}>
            {(removeStar, {data, loading, error}) => (
              <Button
                customClassName={'RepositoryItem-title-action'}              
                onClick={(e) => removeStar()}>
                {!loading ? (`${node.stargazers.totalCount} Star | Remove Star`) : ('Loading..')}
              </Button>
            )}
          </Mutation>
        )}
      </div>
    </div>

    <div>
      { node.viewerSubscription === SubscriptionState.UNSUBSCRIBED ? (
        <Mutation mutation={UPDATE_SUBSCRIPTION_REPOSITORY}
          variables={{ id: node.id, state: SubscriptionState.SUBSCRIBED }}>
          {(updateSubscription, {data, loading, error}) => (
            <Button
              customClassName={'RepositoryItem-title-action'}              
              onClick={(e) => updateSubscription()}
              color='black'>
              {!loading ? (`${node.viewerSubscription} | Subscribe Now`) : ('Loading..')}
            </Button>
          )}
        </Mutation>
      ) : (
        <Mutation mutation={UPDATE_SUBSCRIPTION_REPOSITORY}
          variables={{ id: node.id, state: SubscriptionState.UNSUBSCRIBED }}>
          {(updateSubscription, {data, loading, error}) => (
            <Button
              customClassName={'RepositoryItem-title-action'}              
              onClick={(e) => updateSubscription()}>
              {!loading ? (`${node.viewerSubscription} | UnSubscribe Now`) : ('Loading..')}
            </Button>
          )}
        </Mutation>
      )}
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: node.descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {node.primaryLanguage && (
            <span>Language: {node.primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {node.owner && (
            <span>
              Owner: <a href={node.owner.url}>{node.owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;