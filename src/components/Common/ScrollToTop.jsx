import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

import { selectIsShowScrollToTop } from '../../redux/data/data.selectors'

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
})

function ScrollToTop(props) {
  const { isShowScrollToTop } = props

  const classes = makeStyles(styles)()
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Zoom
      in={isShowScrollToTop}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${isShowScrollToTop ? transitionDuration.exit : 0}ms`
      }}
      unmountOnExit
    >
      <Fab
        aria-label="scroll to top"
        className={classes.fab}
        color="primary"
        onClick={scrollToTop}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  )
}

ScrollToTop.propTypes = {
  isShowScrollToTop: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isShowScrollToTop: selectIsShowScrollToTop
})

export default connect(mapStateToProps)(ScrollToTop)
