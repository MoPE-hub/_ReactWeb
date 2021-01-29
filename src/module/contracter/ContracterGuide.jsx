import React from 'react'
import { connect } from 'react-redux'

import GuideGeneral from './step/ContracterGuideGeneral'
import GuidePackage from './step/ContracterGuidePackage'
import GuideAgree from './step/ContracterGuideAgree'

const ContracterGuide = props => {

  const { contracter } = props

  const getGuideType = () => {

    switch (contracter.guideType) {
      case 'individual':
        return <GuideGeneral />

      case 'chkPkg':
        return <GuidePackage />

      case 'chkAgr':
        return <GuideAgree />

      default:
        return <GuideGeneral />
    }
  }

  return (
    <React.Fragment>
      {
        getGuideType()
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    contracter: state.contracter
  }
}

export default connect(
  mapStateToProps,
  null
)(ContracterGuide)
