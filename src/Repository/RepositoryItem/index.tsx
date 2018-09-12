import * as React from 'react';

import Link from '../../Link';
import { GetRepositories_viewer_repositories_edges_node } from '../../__generated__/types'

import '../style.css';

const RepositoryItem = ( node: GetRepositories_viewer_repositories_edges_node ) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={node.url}>{node.name}</Link>
      </h2>

      <div className="RepositoryItem-title-action">
        {node.stargazers.totalCount} Stars
      </div>
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