import React from 'react'
import { connect } from 'react-redux'
import ContracterNormal from './ContracterNormal'
import ContracterGuide from './ContracterGuide'

import { contracterActions } from '../../store/actions'
import Icon from '../../component/svg/Svg'

const Contracter = props => {

  const { contracter } = props

  const handleClose = () => {
    props.close()
  }

  return contracter.isOpen ? (
    <React.Fragment>
      <div className="modal-overlay normal">
        <div className="modal modal-large">
          <div className="modal-content">

            <div className="modal-header">
              <div className="modal-title dis-flex">

                계약서 업로드
                <input
                  type="radio"
                  id="contract-guide"
                  name="upload-type"
                  checked={ !contracter.isType ? true : false }
                  readOnly
                />

                <input
                  type="radio"
                  id="contract-fix"
                  name="upload-type"
                  checked={ contracter.isType ? true : false }
                  readOnly
                />

                <div
                  className="contract-type-wrap m-l-10"
                >
                  <label
                    className="contract-guide"
                    onClick={() => props.toggleType()}
                  >
                    <Icon icon="guide" width={12} height={12} />
                  </label>

                  <label
                    className="contract-fix"
                    onClick={() => props.toggleType()}
                  >
                    <Icon icon="fix" width={12} height={12} />
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="icon-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  onClick={() => handleClose()}
                >
                  &times;
                </span>
              </button>
            </div>

            { contracter.isType ? (
              <ContracterNormal />
            ) : (
              <ContracterGuide />
            )}

          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null
}

const mapStateToProps = state => {
  return {
    contracter: state.contracter
  }
}

const actionCreators = {
  toggleType: contracterActions.toggleType,
  close: contracterActions.close
}

export default connect(
  mapStateToProps,
  actionCreators
)(Contracter)
