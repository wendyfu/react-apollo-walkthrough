import * as React from 'react'
import { GetRepositoriesVariables } from '../__generated__/types';
import Loading from '../Loading';
import { ButtonUnobtrusive } from '../Button';

interface FetchMoreProps {
  loading: boolean,
  hasNextPage: boolean,
  variables: GetRepositoriesVariables,
  updateQuery: any,
  fetchMore: any,
  children: React.ReactNode
}

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children,
} : FetchMoreProps) => (
  <div className="FetchMore">
    { loading ? (<Loading/>) : (
      <ButtonUnobtrusive type="button" className="FetchMore-button"
        onClick={() => fetchMore({ variables, updateQuery })}>
      More {children}
    </ButtonUnobtrusive>
    )}
  </div>
)

export default FetchMore