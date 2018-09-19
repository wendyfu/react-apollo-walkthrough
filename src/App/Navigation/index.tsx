import * as React from 'react'
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router'

import Button from '../../Button';
import Input from '../../Input';
import * as routes from '../../constants/routes';

import './style.css';

interface NavigationProps {
  location : { pathname: string }
}

interface OrganizationSearchProps {
  organizationName: string,
  onOrganizationSearch: (value: string) => void
}

class Navigation extends React.Component<NavigationProps & OrganizationSearchProps & RouteComponentProps<any>> {
  
  render() {
    const { location: { pathname }, organizationName, onOrganizationSearch} = this.props
    
    return (
      <header className="Navigation">
        <div className="Navigation-link">
          <Link to={routes.PROFILE}>Profile</Link>
        </div>
        <div className="Navigation-link">
          <Link to={routes.ORGANIZATION}>Organization</Link>
        </div>

        {location.pathname === routes.ORGANIZATION && (
          <OrganizationSearch 
            organizationName={organizationName}
            onOrganizationSearch={onOrganizationSearch}/>
        )}
      </header>
    )
  }
}

class OrganizationSearch extends React.Component<OrganizationSearchProps> {
  state = {
    value: this.props.organizationName
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value })
  }

  onSubmit = (event: React.FormEvent) => {
    this.props.onOrganizationSearch(this.state.value)
    event.preventDefault()
  }

  render() {
    const { value } = this.state

    return (
      <div className="Navigation-search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={'white'}
            type="text"
            value={value}
            onChange={this.onChange} />
            {' '}
          <Button color={'white'} type="submit">
            Search
          </Button>
        </form>
      </div>
    )
  }
}

export default withRouter<NavigationProps & OrganizationSearchProps & RouteComponentProps<any>>(Navigation)
