import gql from 'graphql-tag'
import REPOSITORY_FRAGMENT from './Repository/fragments'

// export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
//   query GetRepositories {
//     viewer {
//       repositories(
//         first: 5
//         orderBy: { direction: DESC, field: STARGAZERS }
//       ) {
//         edges {
//           node {
//             id
//             name
//             url
//             descriptionHTML
//             primaryLanguage {
//               name
//             }
//             owner {
//               login
//               url
//             }
//             stargazers {
//               totalCount
//             }
//             viewerHasStarred
//             watchers {
//               totalCount
//             }
//             viewerSubscription
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const ADD_STAR_REPOSITORY = gql`
  mutation addStar($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR_REPOSITORY = gql`
  mutation removeStar($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION_REPOSITORY = gql`
  mutation updateSubscription($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;