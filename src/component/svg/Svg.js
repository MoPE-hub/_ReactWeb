import React from 'react'
import PropTypes from "prop-types";

import { ICONS } from "./icon";

import '../../assets/svg/icons-ed.svg'

const Icon = props => {
  const { icon, color, width, height } = props;
  return (
    <svg width={width} height={height} viewBox={ICONS[icon].viewBox}>
      <path d={ICONS[icon].path} fill={color ? color : ""} />
    </svg>
  )
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

Icon.defaultProps = {
  width: 22,
  height: 22
}

export default Icon
