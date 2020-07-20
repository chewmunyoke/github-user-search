import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

import ScrollToTop from '../components/Common/ScrollToTop'
import Spinner from '../components/Common/Spinner'
import NavBar from '../components/NavBar'

import { unsetToast } from '../redux/toast/toast.actions'
import { selectToast } from '../redux/toast/toast.selectors'
import './App.scss'

const MainPage = lazy(() => import('../pages/MainPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))

const styles = theme => ({
  main: {
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[100],
    '& > section': {
      paddingTop: '154px',
      paddingBottom: theme.spacing(3),
      minHeight: '100vh',
      [theme.breakpoints.down('xs')]: {
        paddingTop: '88px',
        paddingBottom: 'unset'
      }
    }
  },
  snackbar: {
    top: theme.spacing(8)
  }
})

function App(props) {
  const { toast, unsetToast } = props

  const classes = makeStyles(styles)()

  const handleCloseSnackbar = () => {
    unsetToast()
  }

  return (
    <main className={classes.main}>
      <Switch>
        <Route component={NavBar} />
      </Switch>
      <Suspense fallback={<Spinner size={150} thickness={2.5} />}>
        <Switch>
          <Route exact path='/search' component={MainPage} />
          <Route exact path="/user/:username" component={ProfilePage} />
          <Route render={() =>
            (<Redirect to='/search' />)
          } />
        </Switch>
      </Suspense>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={toast.type === 'error' ? null : 5000}
        TransitionComponent={Slide}
        className={classes.snackbar}
        open={toast.message !== null}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant="filled"
          elevation={12}
          severity={toast.type}
          onClose={handleCloseSnackbar}
        >
          <AlertTitle>
            { `${toast.type ? toast.type.charAt(0).toUpperCase() + toast.type.substring(1) : null}` }
          </AlertTitle>
          {
            typeof toast.message === 'string'
              ? toast.message.split('\n').map(item => (
                <div key={item}>{ item }</div>
              ))
              : null
          }
        </Alert>
      </Snackbar>
      <ScrollToTop />
    </main>
  )
}

App.propTypes = {
  isLoading: PropTypes.bool,
  toast: PropTypes.object,
  unsetToast: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  toast: selectToast
})

const mapDispatchToProps = dispatch => ({
  unsetToast: () => dispatch(unsetToast())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
