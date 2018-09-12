import * as React from 'react';

const Link = ({ ...props }) => (
  <a {...props} target="_blank">
    {props.children}
  </a>
);

export default Link;