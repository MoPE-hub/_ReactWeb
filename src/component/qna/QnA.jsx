import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { commonActions } from '../../store/actions'
import isNav from "../../store/reducers/common.reducers";
import QnAList from "./list/QnAList";

const QnA = props => {

  const [ state, setState ] = useState({})

  const handleClick = () => {
    setState({
      toggleOpen: !state.toggleOpen
    })
  }

  return(
    <React.Fragment>
      <ul className="list-toggle">
        {
          QnAList.map((data, index) => {
            return (
              <li key={index}>
                <input type="radio" id={"accordion" + index} name="qna-accordion" />
                <label htmlFor={"accordion" + index} className="title-qna">{data.title}</label>

                <div className="accordion-open">
                  <span>{data.description}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    //
  }
}

const actionCreators = {
  //
}

export default connect(
  mapStateToProps,
  actionCreators
)(QnA)