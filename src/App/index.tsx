import * as React from 'react';
import { OperationVariables } from 'apollo-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Organization from '../Organization';
import Profile from '../Profile';
import Navigation from './Navigation';
import { QueryResult } from 'react-apollo';
import { GetRepositories } from '../__generated__/types';
import * as routes from '../constants/routes';

import './style.css'

const OrganizationRouteComponent = (organizationName: string) => {
  return (
    <div className="App-content_large-header">
      <Organization organizationName={organizationName}/>
    </div>
  )
}

const ProfileRouteComponent = () => {
  return (
    <div className="App-content_large-header">
      <Profile />
    </div>
  )
}

class App extends React.Component<{}> {
  state = {
    organizationName: 'the-road-to-learn-react'
  }

  onOrganizationSearch = (value: string) => {
    this.setState({ organizationName: value })
  }

  render() {
    const { organizationName } = this.state
    return (
      <Router>
        <div className="App">
          <Navigation 
            organizationName={organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />
          <div className="App-main">
            <Route exact path={routes.ORGANIZATION} component={() => (
              <div className="App-content_large-header">
                <Organization organizationName={organizationName}/>
              </div>
            )} />
            <Route exact path={routes.PROFILE} component={ProfileRouteComponent} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;