import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QueryString from 'query-string'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '@material-ui/core/Link'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

import { fetchUsersStart } from '../redux/data/data.actions'
import CONSTANTS from '../config/constants'
import { ReactComponent as Logo } from '../assets/github.svg'

const styles = theme => ({
  appBar: {
    backgroundImage: 'linear-gradient(135deg, #4c4177, #2a5470)',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(1.5)}px`
  },
  box: {
    flexGrow: 1,
    height: '64px'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '64px',
    padding: theme.spacing(3),
    '& > svg': {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 'unset',
      '& > svg': {
        display: 'block',
        marginRight: theme.spacing(2)
      }
    }
  }
})

const getQueryParamByName = (search, name) => {
  const queries = QueryString.parse(search)
  return queries[name]
}

function NavBar(props) {
  const { history, fetchUsersStart } = props

  const [searchText, setSearchText] = React.useState('')

  const classes = makeStyles(styles)()
  const theme = useTheme()

  const handleSearchClear = () => {
    setSearchText('')
  }

  const handleSearch = () => {
    if (searchText !== '') {
      history.push({
        pathname: '/search',
        search: `?q=${searchText}`
      })
      fetchUsersStart({
        page: 1,
        q: searchText
      })
    }
  }

  const handleSearchKeyDown = event => {
    if (event.keyCode === 13 && searchText !== '') {
      handleSearch()
    }
  }

  const searchUsers = search => {
    const searchText = getQueryParamByName(search, 'q')
    if (searchText && searchText !== '') {
      setSearchText(searchText)
      fetchUsersStart({
        page: 1,
        q: searchText
      })
    }
  }

  React.useEffect(() => {
    let unlisten
    if (history) {
      unlisten = history.listen((location, action) => {
        if (action === 'POP' && location.pathname === '/search' && location.search !== '') {
          searchUsers(location.search)
        }
      })
      if (history.location && history.location.search && history.location.search !== '') {
        searchUsers(location.search)
      }
    }
    return () => {
      if (unlisten) unlisten()
    }
  }, [])

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link
            component="button"
            color="inherit"
            underline="none"
            className={classes.header}
            onClick={() => history.push('/')}
          >
            <Logo fill="white" width={25} height={25} />
            <Typography variant="h5" className={classes.title}>
              { CONSTANTS.APP_NAME }
            </Typography>
          </Link>
          <Box className={classes.box} />
        </Toolbar>
      </AppBar>
      <AppBar color="default" className={classes.searchBar}>
        <Logo fill={theme.palette.primary[500]} width={30} height={30} />
        <FormControl
          variant="outlined"
          size="small"
          fullWidth
        >
          <InputLabel htmlFor="search">
            Search Username
          </InputLabel>
          <OutlinedInput
            id="search"
            labelWidth={130}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="search icon"
                  size="small"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              searchText !== '' ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear icon"
                    size="small"
                    onClick={handleSearchClear}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </FormControl>
      </AppBar>
    </>
  )
}

NavBar.propTypes = {
  history: PropTypes.object,
  fetchUsersStart: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  fetchUsersStart: username => dispatch(fetchUsersStart(username))
})

export default connect(null, mapDispatchToProps)(NavBar)
