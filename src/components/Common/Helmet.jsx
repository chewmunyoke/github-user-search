import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import CONSTANTS from '../../config/constants'

export default function CustomHelmet(props) {
  let { title } = props
  if (title && title.length > 0) {
    title = `${title} - ${CONSTANTS.APP_NAME}`
  } else {
    title = CONSTANTS.APP_NAME
  }

  return (
    <Helmet>
      <title>
        { title }
      </title>
    </Helmet>
  )
}

CustomHelmet.propTypes = {
  title: PropTypes.string
}
