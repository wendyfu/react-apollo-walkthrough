import * as React from 'react';

import Profile from '../Profile';
import { QueryResult } from 'react-apollo';
import { GetRepositories } from '../__generated__/types';
import { OperationVariables } from 'apollo-client';

class App extends React.Component<{}> {
  render() {
    return <Profile />;
  }
}

export default App;