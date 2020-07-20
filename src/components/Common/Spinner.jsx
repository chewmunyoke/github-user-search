import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(245, 245, 245, .87)'
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(5)
  }
})

export default function Spinner(props) {
  const { hasOverlay, size, thickness } = props

  const classes = makeStyles(styles)()

  const spinner = (
    <section className={classes.section}>
      <div className={classes.div}>
        <CircularProgress size={size} thickness={thickness} />
      </div>
    </section>
  )

  return (
    hasOverlay
      ? (
        <div className={classes.overlay}>
          { spinner }
        </div>
      )
      : spinner
  )
}

Spinner.propTypes = {
  hasOverlay: PropTypes.bool,
  size: PropTypes.number,
  thickness: PropTypes.number
}
