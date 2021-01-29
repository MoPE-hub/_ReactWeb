import React from 'react'
import classNames from 'classnames'

const Button = ({
  handleClick,
  children,
  isStyleDefault,
  isStyleCancel,
  isStyleDestructive
}) => {
  const buttonClass = classNames({
    'btn btn-md': true,
    'btn-white': isStyleCancel,
    'btn-dark-gray': isStyleDefault,
    'btn-red': isStyleDestructive,
  })
  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
