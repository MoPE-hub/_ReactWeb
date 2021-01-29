import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { inputActions } from '../../store/actions'

const BatchAddColumns = props => {

  const { input } = props

  const handleAddInput = () => {
    props.add({ value: null })
  }

  const handleRemove = index => {
    props.remove({ index: index })
  }

  const handleChange = (i, e) => {
    props.update({
      index: i,
      value: e.target.value
    })
  }

  useEffect(() => {

  },[input])

  return(
    <React.Fragment>

      <div className="batch-extension m-t-10">
        <button
          className="btn btn-light-gray btn-sm m-b-10"
          onClick={() => handleAddInput()}
        >
          항목 추가 [{input.length}]
        </button>

        <ul className="batch-input">
        {
          input ? input.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="text"
                className="form-control input-text"
                value={item.value ? item.value : ""}
                placeholder="예시) 직책"
                onChange={e => handleChange(index, e)}
              />

              <button
                type="button"
                className="batch-extension-close btn-transparent"
                onClick={() => handleRemove(index)}
              >
                &times;
              </button>

            </li>
          )
          })
          : ''
        }
        </ul>
      </div>

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    input: state.input
  }
}

const actionCreators = {
  add: inputActions.add,
  remove: inputActions.remove,
  update: inputActions.update
}

export default connect(
  mapStateToProps,
  actionCreators
)(BatchAddColumns)
