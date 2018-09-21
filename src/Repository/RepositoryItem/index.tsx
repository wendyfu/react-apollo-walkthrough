import * as React from 'react';
import gql from 'graphql-tag'

import { Mutation, DataProps } from 'react-apollo'
import Button from '../../Button'
import Dropdown from '../../Dropdown'
import Link from '../../Link';
import { GetRepositories_viewer_repositories_edges_node, SubscriptionState, addStar, removeStar, updateSubscription } from '../../__generated__/types'

import '../style.css';
import { ADD_STAR_REPOSITORY, REMOVE_STAR_REPOSITORY, UPDATE_SUBSCRIPTION_REPOSITORY } from '../../queries';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import { REPOSITORY_FRAGMENT } from '..';

const updateAddStar = (cache: InMemoryCache, result: DataProps<addStar>) => {
  const repository:GetRepositories_viewer_repositories_edges_node = cache.readFragment({
    id: `Repository:${result.data.addStar.starrable.id}`,
    fragment: REPOSITORY_FRAGMENT
  })

  const totalCount = repository.stargazers.totalCount + 1;

  cache.writeFragment({
    id: `Repository:${result.data.addStar.starrable.id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      },
    },
  });
}

const updateRemoveStar = (cache: InMemoryCache, result: DataProps<removeStar>) => {
  const repository:GetRepositories_viewer_repositories_edges_node = cache.readFragment({
    id: `Repository:${result.data.removeStar.starrable.id}`,
    fragment: REPOSITORY_FRAGMENT
  })

  const totalCount = repository.stargazers.totalCount - 1;

  cache.writeFragment({
    id: `Repository:${result.data.removeStar.starrable.id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      },
    },
  });
}

const updateWatcherCount = (cache: InMemoryCache, result: DataProps<updateSubscription>) => {
  const repository:GetRepositories_viewer_repositories_edges_node = cache.readFragment({
    id: `Repository:${result.data.updateSubscription.subscribable.id}`,
    fragment: REPOSITORY_FRAGMENT
  })

  let { totalCount } = repository.watchers
  totalCount = (result.data.updateSubscription.subscribable.viewerSubscription === SubscriptionState.SUBSCRIBED) ?
  totalCount + 1 :
  (totalCount > 0) ? totalCount - 1 : totalCount;
  
  cache.writeFragment({
    id: `Repository:${result.data.updateSubscription.subscribable.id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
}

const RepositoryItem = ( node: GetRepositories_viewer_repositories_edges_node ) => {
  let dropdown: HTMLSelectElement

  return (
    <div>
      <div className="RepositoryItem-title">
        <h2>  
          <Link href={node.url}>{node.name}</Link>
        </h2>
        <div>
          { !node.viewerHasStarred ? (
            <Mutation mutation={ADD_STAR_REPOSITORY} variables={{ id: node.id }} update={updateAddStar}>
              {(addStar, {data, loading, error}) => (
                <Button
                  className={'RepositoryItem-title-action'}              
                  onClick={(e) => addStar()}
                  color='black'>
                  {!loading ? (`${node.stargazers.totalCount} Star`) : ('Loading..')}
                </Button>
              )}
            </Mutation>
          ) : (
            <Mutation mutation={REMOVE_STAR_REPOSITORY} variables={{ id: node.id }} update={updateRemoveStar}>
              {(removeStar, {data, loading, error}) => (
                <Button
                  className={'RepositoryItem-title-action'}              
                  onClick={(e) => removeStar()}>
                  {!loading ? (`${node.stargazers.totalCount} Star | Remove Star`) : ('Loading..')}
                </Button>
              )}
            </Mutation>
          )}
        </div>
      </div>

      <div>
        <Mutation mutation={UPDATE_SUBSCRIPTION_REPOSITORY} update={updateWatcherCount}>
          {(updateSubscription, {data, loading, error}) => (
            <React.Fragment>
              <Dropdown selected={node.viewerSubscription}
                reference={node => dropdown = node}
                options={Object.keys(SubscriptionState)}
                onChange={e => 
                  updateSubscription({
                    variables: { id: node.id, state: dropdown.value },
                    optimisticResponse: {
                      updateSubscription: {
                        __typename: 'Mutation',
                        subscribable: {
                          __typename: 'Repository',
                          id: node.id,
                          viewerSubscription: dropdown.value
                        }
                      }
                    }
                  })
                }/>
              {` Total watchers: ${node.watchers.totalCount}`}
            </React.Fragment>
          )}
        </Mutation>
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
  )
};

export default RepositoryItem;