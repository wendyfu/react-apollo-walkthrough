import * as React from 'react';

import RepositoryItem from '../RepositoryItem';
import { GetRepositories_viewer_repositories } from '../../__generated__/types'

import '../style.css';

interface RepositoryListProps {
  repositories: GetRepositories_viewer_repositories
}  

const RepositoryList = ( props: RepositoryListProps ) => 
  (<React.Fragment>
    {props.repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
      )
    )}
  </React.Fragment>)

export default RepositoryList

// export default class RepositoryList extends React.Component<RepositoryListProps, any> {
//   constructor(props: RepositoryListProps) {
//     super(props)
//   }

//   public render() {
//     const { repositories } = this.props
//     return (
//       repositories.edges.map(({ node }) => (
//         <div key={node.id} className="RepositoryItem">
//           <RepositoryItem {...node} />
//         </div>
//       ))
//     )
//   }
// }
