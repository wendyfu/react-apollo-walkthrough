import * as React from 'react';

import './style.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  customclassname: string,
  color?: 'black' | 'white' | 'salmon',
  type?: 'button',
}

class Button extends React.Component<ButtonProps> {

  static defaultProps: Partial<ButtonProps> = {
    color: 'salmon',
    type: 'button'
  }

  public render() {
    const { customclassname, color, type, children } = this.props
    return (
      <button
        className={`${customclassname} Button Button_${color}`}
        type={type} 
        {...this.props}>
        {children}
      </button>
    )
  }
}

// const Button = ( props: Partial<ButtonProps> = { color: 'salmon', type: 'button'}) => (
//   <button
//     className={`${props.customClassName} Button Button_${props.color}`}
//     type={props.type} 
//     {...props}>
//     {props.children}
//   </button>
// )

// const Button = ({
//   children,
//   className,
//   color = 'black',
//   type = 'button',
//   ...props
// }) => (
//   <button
//     className={`${className} Button Button_${color}`}
//     type={type}
//     {...props}
//   >
//     {children}
//   </button>
// );

export default Button;