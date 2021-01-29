import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { columnsActions } from '../store/actions'
import { toast } from 'react-toastify'
import Input from '../module/input'

const AddColumns = props => {

  const { columns } = props

  const [ state, setState ] = useState({
    title: ''
  })

  const handleChange= (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const setColumns = () => {
    if(!state.title) {
      toast.info('항목명을 입력하세요.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    props.setColumns(state)
  }

  useEffect(() => {

  }, [columns])


  return (
    <React.Fragment>
      <div className="modal-overlay">
        <div className="modal modal-small">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                항목 추가
              </div>
              <button
                type="button"
                className="icon-close"
                data-dismiss="modal" aria-label="Close"
                onClick={() => props.isAddColumnOpen()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-description">
                추가할 항목을 입력하세요
              </div>
              <div className="modal-extension p-l-10 p-r-10 p-b-10">
                {
                  columns.columns.length > 0 ? columns.columns.map((item, index) => (
                    <div
                      key={index}
                      className="block-del m-b-10"
                    >
                      <span>
                        {item.column.title}
                      </span>

                      <button
                        type="button"
                        className="icon-close"
                        data-dismiss="delete"
                        aria-label="delete"
                        onClick={() => props.deleteColumns(item)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ))
                  : ''
                }
                <div className="input-with-btn m-t-10">
                  <Input
                    type={"text"}
                    name="title"
                    value={state.title}
                    className="form-control input"
                    wrapperClassName="sizefull"
                    placeholder=""
                    message={"항목을 입력하세요"}
                    onChange={(e) => handleChange(e)}
                    required={true}
                    numberOnly={false}
                    submitted={state.submitted}
                    withBtn={true}
                    withBtnName={"등록"}
                    withBtnClick={() => setColumns()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    columns: state.columns
  }
}

const actionCreators = {
  setColumns: columnsActions.setColumns,
  deleteColumns: columnsActions.deleteColumns
}

export default connect(
  mapStateToProps,
  actionCreators
)(AddColumns)
