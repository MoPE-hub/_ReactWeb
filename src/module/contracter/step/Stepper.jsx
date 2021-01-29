import React, { useState } from 'react'
import { connect } from 'react-redux'
import { contracterActions } from '../../../store/actions'

const Stepper = props => {

  const { contracter } = props

  const handleType = (type) => {
    props.guideType(type)
  }

  return (
    <div className="content">
      <div className="step-radio-group">
        <input
          type="radio"
          id="individual"
          name="selector"
          defaultChecked={contracter.guideType === 'individual' ? true : false}
          onChange={() => handleType('individual')}
        />

        <input
          type="radio"
          id="chkPkg"
          name="selector"
          defaultChecked={contracter.guideType === 'chkPkg' ? true : false}
          onChange={() => handleType('chkPkg')}
        />

        <input
          type="radio"
          id="chkAgr"
          name="selector"
          defaultChecked={contracter.guideType === 'chkAgr' ? true : false}
          onChange={() => handleType('chkAgr')}
        />

        <div className="step-radio-group-inner">
          <label htmlFor="individual" className="individual">일반계약</label>
          <label htmlFor="chkPkg" className="chkPkg">일괄계약</label>
          <label htmlFor="chkAgr" className="chkAgr">청약서</label>
        </div>

        <div className="step-radio-group-extension">
          <div className="description individual">
            <span className="text-underline">일반적인 1:1 또는 1:N 계약형태</span>로 계약서 및 계약참여자를 직접 입력하여 <span className="text-underline">계약서를 생성합니다.</span>
          </div>

          <div className="description chkPkg">
            <span className="text-underline">동일한 서식으로 다수의 계약 체결</span>시, 계약 상대방의 정보를 엑셀파일로 일괄 업로드하면 <span className="text-underline">여러 건의 계약서가 자동</span>으로 생성됩니다.
          </div>

          <div className="description chkAgr">
            <span className="text-underline">요청자의 서명 없이</span> 참여자의 정보입력 및 서명이 필요한 청약서를 생성합니다.
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    contracter: state.contracter
  }
}

const actionCreators = {
  guideType: contracterActions.guideType
}

export default connect(
  mapStateToProps,
  actionCreators
)(Stepper)
