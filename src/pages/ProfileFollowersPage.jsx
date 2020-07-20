import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  follower: {
    display: 'flex',
    '& .info': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(2),
      width: '100%'
    }
  },
  followerAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
})

export default function ProfileFollowersPage(props) {
  const { followers } = props

  const classes = makeStyles(styles)()

  return (
    <ul>
      {
        followers.map((follower, index) => (
          <li className={classes.follower} key={index}>
            <Avatar
              className={classes.followerAvatar}
              alt={follower.login}
              src={follower.avatar_url}
            />
            <div className="info">
              <Link to={`/user/${follower.login}`}>
                <Typography variant="subtitle1">
                  { follower.login }
                </Typography>
              </Link>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

ProfileFollowersPage.propTypes = ({
  followers: PropTypes.array.isRequired
})
