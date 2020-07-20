import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import Spinner from '../components/Common/Spinner'
import TabPanel from '../components/Common/TabPanel'
import ProfileInfoPage from './ProfileInfoPage'
import ProfileReposPage from './ProfileReposPage'
import ProfileFollowersPage from './ProfileFollowersPage'

import { fetchUserStart } from '../redux/data/data.actions'
import { selectUser, selectIsFetching } from '../redux/data/data.selectors'

const styles = theme => ({
  section: {
    height: '100vh',
    '& > *': {
      height: '100%'
    },
    '& svg': {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down('xs')]: {
      height: 'unset'
    }
  },
  grid: {
    height: '100%'
  },
  gridItem: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      '&:first-of-type': {
        height: 'unset'
      }
    }
  },
  paper: {
    height: '100%',
    overflow: 'hidden'
  },
  tabPanel: {
    height: 'calc(100% - 48px)',
    overflowX: 'hidden',
    overflowY: 'scroll',
    [theme.breakpoints.down('xs')]: {
      maxHeight: 'calc(100vh - 84px - 48px - 64px)'
    }
  }
})

function ProfilePage(props) {
  const { match, user, isFetching, fetchUserStart } = props

  const classes = makeStyles(styles)()

  const [tabValue, setTabValue] = React.useState(0)

  React.useEffect(() => {
    setTabValue(0)
    fetchUserStart(match.params.username)
  }, [match])

  if (!user || isFetching) {
    return (
      <Spinner hasOverlay size={150} thickness={2.5} />
    )
  }

  return (
    <section className={classes.section}>
      <Box p={2}>
        <Grid container className={classes.grid}>
          <Grid item sm={4} className={classes.gridItem}>
            <ProfileInfoPage user={user} />
          </Grid>
          <Grid item sm={8} className={classes.gridItem}>
            <Paper className={classes.paper}>
              <AppBar position="static" color="default">
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="tabs"
                  value={tabValue}
                  onChange={(event, tabValue) => setTabValue(tabValue)}
                >
                  <Tab label={`Repositories (${user.public_repos || 0})`} />
                  <Tab label={`Followers (${user.followers || 0})`} />
                  <Tab label={`Following (${user.following || 0})`} />
                </Tabs>
              </AppBar>
              <TabPanel
                className={classes.tabPanel}
                value={tabValue}
                index={0}
              >
                <ProfileReposPage repos={user.reposItems || []} />
              </TabPanel>
              <TabPanel
                className={classes.tabPanel}
                value={tabValue}
                index={1}
              >
                <ProfileFollowersPage followers={user.followersItems || []} />
              </TabPanel>
              <TabPanel
                className={classes.tabPanel}
                value={tabValue}
                index={2}
              >
                <ProfileFollowersPage followers={user.followingItems || []} />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </section>
  )
}

ProfilePage.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  fetchUserStart: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  isFetching: selectIsFetching
})

const mapDispatchToProps = dispatch => ({
  fetchUserStart: username => dispatch(fetchUserStart(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
