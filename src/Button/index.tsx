import * as React from 'react';

import './style.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  // customclassname: string,
  color?: 'black' | 'white' | 'salmon',
  type?: 'button' | 'submit',
}

class Button extends React.Component<ButtonProps> {

  static defaultProps: Partial<ButtonProps> = {
    color: 'salmon',
    type: 'button'
  }

  public render() {
    const { className, color, type, children, ...rest } = this.props
    return (
      <button
        {...rest}
        className={`${className} Button Button_${color}`}
        type={type}>
        {children}
      </button>
    )
  }
}

interface ButtonUnobtrusiveProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  type: string,
}

class ButtonUnobtrusive extends React.Component<ButtonUnobtrusiveProps> {
  
  render() {
    const { className, type, children, ...rest } = this.props
    return (<button
      {...rest}
      className={`${className} Button_unobtrusive`} type={type}>
      {children}
    </button>)
  }
}

// const ButtonUnobtrusive = (
//   children: React.ReactNode,
//   className: string,
//   type = 'button',
//   { ...props }
// ) => {
//   (
//     <button
//       className={`${className} Button_unobtrusive`}
//       type={type}
//       {...props}
//     >
//       {children}
//     </button>
//   )
// };

export { ButtonUnobtrusive };

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