import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Spinner from '../components/Common/Spinner'
import UserCard from '../components/UserCard'

import { fetchUsersStart, setIsShowScrollToTop } from '../redux/data/data.actions'
import { selectUsers, selectIsFetching, selectIsShowScrollToTop } from '../redux/data/data.selectors'

const styles = theme => ({
  gridItem: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
})

let localUsers = null
let localIsShowScrollToTop = false
let isFetchingNext = false

function MainPage(props) {
  const { history, users, isFetching, isShowScrollToTop, fetchUsersStart, setIsShowScrollToTop } = props

  const classes = makeStyles(styles)()

  const pageRef = React.useRef(null)

  const handleClickUser = username => {
    history.push(`/user/${username}`)
  }

  React.useEffect(() => {
    if (users && users.currentPage !== users.lastPage) {
      localUsers = {
        currentPage: users.currentPage,
        q: users.q
      }
    }
    isFetchingNext = false
  }, [users])

  React.useEffect(() => {
    localIsShowScrollToTop = isShowScrollToTop
  }, [isShowScrollToTop])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    const listener = () => {
      const isScrolled = window.pageYOffset > window.innerHeight / 2
      if (isScrolled) {
        if (localIsShowScrollToTop !== isScrolled) {
          setIsShowScrollToTop(!localIsShowScrollToTop)
        }
      } else {
        if (localIsShowScrollToTop !== isScrolled) {
          setIsShowScrollToTop(!localIsShowScrollToTop)
        }
      }
      if (pageRef.current && window.innerHeight + window.pageYOffset >= pageRef.current.clientHeight) {
        if (localUsers && !isFetchingNext) {
          isFetchingNext = true
          fetchUsersStart({
            page: localUsers.currentPage + 1,
            q: localUsers.q
          })
        }
      }
    }
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])

  return (
    <section>
      <Box m={2} ref={pageRef}>
        {
          isFetching && !isFetchingNext && (
            <Spinner hasOverlay size={150} thickness={2.5} />
          )
        }
        {
          users && users.label && (
            <Typography variant="subtitle1" align="center" gutterBottom>
              { users.label }
            </Typography>
          )
        }
        <Grid container>
          {
            users && users.items && users.items.map((item, i) => {
              return (
                <Grid item sm={3} className={classes.gridItem} key={item.id}>
                  <UserCard
                    user={item}
                    index={i}
                    perPage={users.perPage}
                    onClick={handleClickUser}
                  />
                </Grid>
              )
            })
          }
          {
            isFetchingNext && (
              <Grid item sm={3} className={classes.gridItem}>
                <Spinner />
              </Grid>
            )
          }
        </Grid>
      </Box>
    </section>
  )
}

MainPage.propTypes = {
  history: PropTypes.object,
  users: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isShowScrollToTop: PropTypes.bool.isRequired,
  fetchUsersStart: PropTypes.func.isRequired,
  setIsShowScrollToTop: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  isFetching: selectIsFetching,
  isShowScrollToTop: selectIsShowScrollToTop
})

const mapDispatchToProps = dispatch => ({
  fetchUsersStart: params => dispatch(fetchUsersStart(params)),
  setIsShowScrollToTop: isShowScrollToTop => dispatch(setIsShowScrollToTop(isShowScrollToTop))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
