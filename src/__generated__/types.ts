

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRepositories
// ====================================================

export interface GetRepositories_viewer_repositories_edges_node_primaryLanguage {
  __typename: "Language";
  name: string;  // The name of the current language.
}

export interface GetRepositories_viewer_repositories_edges_node_owner {
  __typename: "Organization" | "User";
  login: string;  // The username used to login.
  url: any;       // The HTTP URL for the owner.
}

export interface GetRepositories_viewer_repositories_edges_node_stargazers {
  __typename: "StargazerConnection";
  totalCount: number;  // Identifies the total count of items in the connection.
}

export interface GetRepositories_viewer_repositories_edges_node_watchers {
  __typename: "UserConnection";
  totalCount: number;  // Identifies the total count of items in the connection.
}

export interface GetRepositories_viewer_repositories_edges_node {
  __typename: "Repository";
  id: string;
  name: string;                                                                            // The name of the repository.
  url: any;                                                                                // The HTTP URL for this repository
  descriptionHTML: any;                                                                    // The description of the repository rendered to HTML.
  primaryLanguage: GetRepositories_viewer_repositories_edges_node_primaryLanguage | null;  // The primary language of the repository's code.
  owner: GetRepositories_viewer_repositories_edges_node_owner;                             // The User owner of the repository.
  stargazers: GetRepositories_viewer_repositories_edges_node_stargazers;                   // A list of users who have starred this starrable.
  viewerHasStarred: boolean;                                                               // Returns a boolean indicating whether the viewing user has starred this starrable.
  watchers: GetRepositories_viewer_repositories_edges_node_watchers;                       // A list of users watching the repository.
  viewerSubscription: SubscriptionState | null;                                            // Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
}

export interface GetRepositories_viewer_repositories_edges {
  __typename: "RepositoryEdge";
  node: GetRepositories_viewer_repositories_edges_node | null;  // The item at the end of the edge.
}

export interface GetRepositories_viewer_repositories_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;  // When paginating forwards, the cursor to continue.
  hasNextPage: boolean;      // When paginating forwards, are there more items?
}

export interface GetRepositories_viewer_repositories {
  __typename: "RepositoryConnection";
  edges: (GetRepositories_viewer_repositories_edges | null)[] | null;  // A list of edges.
  pageInfo: GetRepositories_viewer_repositories_pageInfo;              // Information to aid in pagination.
}

export interface GetRepositories_viewer {
  __typename: "User";
  repositories: GetRepositories_viewer_repositories;  // A list of repositories that the user owns.
}

export interface GetRepositories {
  viewer: GetRepositories_viewer;  // The currently authenticated user.
}

export interface GetRepositoriesVariables {
  cursor?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addStar
// ====================================================

export interface addStar_addStar_starrable {
  __typename: "Repository" | "Gist";
  id: string;
  viewerHasStarred: boolean;  // Returns a boolean indicating whether the viewing user has starred this starrable.
}

export interface addStar_addStar {
  __typename: "AddStarPayload";
  starrable: addStar_addStar_starrable;  // The starrable.  **Upcoming Change on 2019-01-01 UTC** **Description:** Type for `starrable` will change from `Starrable!` to `Starrable`. **Reason:** In preparation for an upcoming change to the way we report mutation errors, non-nullable payload fields are becoming nullable.
}

export interface addStar {
  addStar: addStar_addStar | null;  // Adds a star to a Starrable.
}

export interface addStarVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeStar
// ====================================================

export interface removeStar_removeStar_starrable {
  __typename: "Repository" | "Gist";
  id: string;
  viewerHasStarred: boolean;  // Returns a boolean indicating whether the viewing user has starred this starrable.
}

export interface removeStar_removeStar {
  __typename: "RemoveStarPayload";
  starrable: removeStar_removeStar_starrable;  // The starrable.  **Upcoming Change on 2019-01-01 UTC** **Description:** Type for `starrable` will change from `Starrable!` to `Starrable`. **Reason:** In preparation for an upcoming change to the way we report mutation errors, non-nullable payload fields are becoming nullable.
}

export interface removeStar {
  removeStar: removeStar_removeStar | null;  // Removes a star from a Starrable.
}

export interface removeStarVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSubscription
// ====================================================

export interface updateSubscription_updateSubscription_subscribable {
  __typename: "Issue" | "Repository" | "Commit" | "PullRequest" | "Team";
  id: string;
  viewerSubscription: SubscriptionState | null;  // Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
}

export interface updateSubscription_updateSubscription {
  __typename: "UpdateSubscriptionPayload";
  subscribable: updateSubscription_updateSubscription_subscribable;  // The input subscribable entity.  **Upcoming Change on 2019-01-01 UTC** **Description:** Type for `subscribable` will change from `Subscribable!` to `Subscribable`. **Reason:** In preparation for an upcoming change to the way we report mutation errors, non-nullable payload fields are becoming nullable.
}

export interface updateSubscription {
  updateSubscription: updateSubscription_updateSubscription | null;  // Updates the state for subscribable subjects.
}

export interface updateSubscriptionVariables {
  id: string;
  state: SubscriptionState;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// The possible states of a subscription.
export enum SubscriptionState {
  IGNORED = "IGNORED",
  SUBSCRIBED = "SUBSCRIBED",
  UNSUBSCRIBED = "UNSUBSCRIBED",
}

//==============================================================
// END Enums and Input Objects
//==============================================================