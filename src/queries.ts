import gql from 'graphql-tag'
import REPOSITORY_FRAGMENT from './Repository/fragments'

// export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
//   query GetRepositories($cursor: String) {
//     viewer {
//       repositories(
//         first: 5
//         orderBy: { direction: DESC, field: STARGAZERS }
//         after: $cursor
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
//         pageInfo {
//           endCursor
//           hasNextPage
//         }
//       }
//     }
//   }
// `;

// export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
//   query GetRepositoriesOfOrganization($organizationName: String!, $cursor: String) {
//    organization(login: $organizationName) {
//      repositories(first: 2, after: $cursor) {
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
//        }
//        pageInfo {
//          endCursor
//          hasNextPage
//        }
//       }
//     }
//   }
// `;

export const GET_ISSUES_OF_REPOSITORY = gql`
  query GetIssuesOfRepository(
    $repositoryOwner: String!,
    $repositoryName: String!, 
    $issueState: IssueState!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState]) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query GetRepositoriesOfOrganization($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 100, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 2
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
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