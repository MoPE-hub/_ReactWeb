import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { columnsActions, composerActions } from '../store/actions'
import AddColumns from './AddColumns'

const AddColumnsComposer = props => {

  const { input, columns, setColumnComponent } = props

  const [ state, setState ] = useState({
    isComposerOpen: false,
    isExtensionOpen: false
  })

  const isAddColumnOpen = () => {
    setState({
      isAddColumnOpen: !state.isAddColumnOpen
    })
  }

  /*
  useEffect(() => {

  }, [columns])
  */

  return (
    <React.Fragment>
      {
        input.length > 0 ?
          <div
            className="section"
            onClick={() => setState({
              isExtensionOpen: !state.isExtensionOpen
            })}
          >
            추가 항목 ({input.length})
            <span
              className={`icon ${state.isExtensionOpen ? 'icon-arrow-up' : 'icon-arrow-down'}`}
            >
            </span>
          </div>
        : ''
      }

      {/*
        state.isAddColumnOpen ?
          <AddColumns isAddColumnOpen={() => isAddColumnOpen()}/>
        : ''
      */}

      {
        state.isExtensionOpen ?
          <div className="player-wrap">
            {
              input && input.length > 0 ? input.map((item, index) => (
              // columns.columns.length > 0 ? columns.columns.map((item, index) => (
                <div
                  key={index}
                  className="player p-b-0"
                >
                  <div className="block-del sizefull">
                    <button
                      className="btn btn-md btn-full text-left"
                      onClick={() => setColumnComponent({
                        type: 'SET_COLUMN_COMPONENT',
                        column: {
                          index: index,
                          columnInfo: item
                        }
                      })}
                    >
                      {item.value}
                    </button>

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
                </div>
              ))
              : ''
            }
          </div>
        : ''
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    columns: state.columns,
    input: state.input
  }
}

const actionCreators = {
  setColumnComponent: columnsActions.setColumnComponent,
  deleteColumns: columnsActions.deleteColumns
}

export default connect(
  mapStateToProps,
  actionCreators
)(AddColumnsComposer)
