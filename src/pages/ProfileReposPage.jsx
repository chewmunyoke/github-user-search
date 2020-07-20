import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { ReactComponent as ForkIcon } from '../assets/repo-forked.svg'
import { ReactComponent as StarIcon } from '../assets/star.svg'

const styles = theme => ({
  repo: {
    wordBreak: 'break-word'
  },
  repoInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    '& span': {
      margin: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px 0`
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  }
})

export default function ProfileReposPage(props) {
  const { repos } = props

  const classes = makeStyles(styles)()

  return (
    <ul>
      {
        repos.map((repo, index) => (
          <li className={classes.repo} key={index}>
            <Typography variant="h6">
              <a href={repo.svn_url} target="_blank" rel="noopener noreferrer">
                { repo.name }
              </a>
            </Typography>
            <p>
              { repo.description }
            </p>
            <div className={classes.repoInfo}>
              <div>
                <span><StarIcon height={ 12 } />{ repo.stargazers_count }</span>
                <span><ForkIcon height={ 12 } />{ repo.forks_count }</span>
                { repo.language && (<span>{ repo.language }</span>) }
              </div>
              <div>
                { `Updated ${moment(repo.updated_at).fromNow()}` }
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

ProfileReposPage.propTypes = ({
  repos: PropTypes.array.isRequired
})
