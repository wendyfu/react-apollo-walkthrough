import * as React from 'react'

import './style.css'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  color?: 'black' | 'white',
  type?: 'text',
  value?: string
}

export default class Input extends React.Component<InputProps> {

  static defaultProps: Partial<InputProps> = {
    color: 'black',
  }

  render() {
    const { children, color, ...rest } = this.props

    return (
      <input className={`Input Input_${color}`} {...rest} >
        {children}
      </input>
    )
  }
}
