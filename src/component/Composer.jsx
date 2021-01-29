import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions, contracterActions } from '../store/actions'

import Contracter from '../module/contracter'
import Owner from './Owner'
import Batch from './user/Batch'
import AddUser from './AddUser'
import AddOwner from './AddOwner'
import AddColumnsComposer from './AddColumnsComposer'

const Composer = props => {

  const { composer, columns, setComponent, controller, send } = props

  const [ state, setState ] = useState({
    isComposerOpen: false,
    isAddOwnerOpen: false,
    type: 1 //0 일반, 1일괄, 2청약
  })

  const isComposerOpen = () => {
    setState({
      ...state,
      isComposerOpen: !state.isComposerOpen
    })
  }

  const isAddOwnerOpen = () => {
    setState({
      ...state,
      isAddOwnerOpen: !state.isAddOwnerOpen
    })
  }

  useEffect(() => {
    // props.contracter()
  }, [props, composer.users])

  return controller.viewType === 'COMPOSE' ? (
    <React.Fragment>
      <div className="composer-wrap">
        <div className="composer-inner">

          <div className="add-player">
            <button
              className="btn btn-black btn-md btn-full"
              onClick={() => isAddOwnerOpen()}
              disabled={composer.requester.length > 0 ? true : false}
            >
              요청자 설정
            </button>
          </div>

          {
            state.isAddOwnerOpen ?
              <AddOwner isAddOwnerOpen={() => isAddOwnerOpen()}/>
            : ''
          }

          <div className="user-wrap">
            <Owner />
            <Batch />
            <AddColumnsComposer />
          </div>
        </div>

        <div className="complete-wrap">
          <button
            className="btn btn-md btn-full btn-red"
            onClick={() => send({
              data: {
                composer: composer.users,
                expansion: columns.columns
              }
            })}
            disabled={composer.isSetSign.length === composer.users.length ? false : true}
          >
            저장
          </button>
        </div>
      </div>

      <Contracter />

    </React.Fragment>
  ) : null
}

const mapStateToProps = state => {
  return {
    composer: state.composer,
    controller: state.controller,
    columns: state.columns
  }
}

const actionCreators = {
  deleteUser: composerActions.deleteUser,
  setComponent: composerActions.setComponent,
  send: composerActions.send,
  contracter: contracterActions.contracter
}

export default connect(
  mapStateToProps,
  actionCreators
)(Composer)
