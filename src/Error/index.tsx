import * as React from 'react';

import './style.css';
import { ApolloError } from 'apollo-client';

interface ErrorMessageProps {
  error: ApolloError
}

const ErrorMessage = ( props: ErrorMessageProps ) => (
  <div className="ErrorMessage">
    <small>{props.error.toString()}</small>
  </div>
);

export default ErrorMessage;