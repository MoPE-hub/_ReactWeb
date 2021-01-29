import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'

const Button = ({
  onClick,
  label,
  isStyleDefault,
  isStyleCancel,
  isStyleDestructive,
}) => {
  const buttonClass = classNames({
    'btn btn-md': true,
    'btn-white m-r-10': isStyleCancel,
    'btn-dark-gray': isStyleDefault,
    'btn-red': isStyleDestructive,
  })
  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
    >
      {' '}
      {label}
    </button>
  )
}

Button.defaultProps = {
  isStyleDefault: false,
  isStyleCancel: false,
  isStyleDestructive: false,
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isStyleDefault: PropTypes.bool,
  isStyleCancel: PropTypes.bool,
  isStyleDestructive: PropTypes.bool,
}

const ModalOverlay = ({
  isModalVisible,
  hide,
  options,
  children,
}) => {
  function handleOverlayClicked(e) {
    if (e.target.className !== 'modal-overlay') {
      return
    }
    if (options === undefined) {
      hide()
    } else {
      if (options.overlayClose !== false) {
        hide()
      }
      if (options.onOverlayClicked) {
        options.onOverlayClicked()
      }
    }
  }

  function renderBody() {
    if (children) {
      return children
    } if (options && options.message) {
      return (
        <div className="modal-extension">
          {options.message}
        </div>
      )
    }
    return false
  }

  function renderFooter() {
    const { buttons } = options
    return (
      <div className="modal-footer">
        {buttons.map(button => (
          <React.Fragment key={shortid.generate()}>
            {button}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const modalWrapperClass = classNames({
    'modal-overlay': true,
    'modal-wrapper': true,
    'modal-wrapper-centered': options && options.centered,
  })

  const modalClass = classNames({
    'modal': true,
    'modal-large': options && options.large,
    'modal-x-large': !options || (options && !options.large),
    'modal-animated modal-animation-fade-in': options && options.animated,
  })

  const visible = {
    visibility: 'visible'
  }

  return isModalVisible ? ReactDOM.createPortal(
    <React.Fragment>
      <div className={modalWrapperClass} aria-modal aria-hidden tabIndex={-1} role="dialog" style={visible} onClick={handleOverlayClicked}>
        <div className={modalClass}>
          <div className="modal-content">
            {options !== undefined && options.closeButton === false ? null : (
              <div className="modal-header">
                {options !== undefined && options.title !== undefined && (
                  <div className="modal-title">
                    {options.title}
                  </div>
                )}
                <button type="button" className="icon-close" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="modal-body">
              <div className="modal-description">
                {options.message}
              </div>
              {renderBody()}
            </div>
            {options && options.buttons && options.buttons.length > 0 && renderFooter()}
          </div>
        </div>
      </div>
    </React.Fragment>, document.body,
  ) : null
}

const Modal = () => {}
Modal.Button = Button
Modal.Modal = ModalOverlay

export default Modal

export const useModal = (options) => {
  const [hasToggledBefore, setHasToggledBefore] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const isModalVisibleRef = useRef(isModalVisible)
  isModalVisibleRef.current = isModalVisible
  let timeoutHack

  function toggle() {
    timeoutHack = setTimeout(() => {
      setIsModalVisible(!isModalVisibleRef.current)
      clearTimeout(timeoutHack)
    }, 10)
    setIsShown(!isShown)
    setHasToggledBefore(true)
  }

  function handleKeyDown(event) {
    if (event.keyCode !== 27 || (options && options.keyboardClose === false))
    return toggle()

    if (options && options.onEscapeKeyDown) {
      options.onEscapeKeyDown()
    }
  }

  useEffect(() => {
    if (isShown) {
      if (options && options.onShow) {
        options.onShow()
      }
      document.addEventListener('keydown', handleKeyDown)
      document.body.classList.add('modal-open')
    }
    if (!isShown && hasToggledBefore) {
      if (options && options.onHide) {
        options.onHide()
      }
      document.body.classList.remove('modal-open')
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, hasToggledBefore, isShown, options])

  return [
    {
      isShown,
      isModalVisible,
      hide: toggle,
      options,
    },
    toggle,
  ]
}
