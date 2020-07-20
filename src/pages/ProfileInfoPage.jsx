import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { ReactComponent as LinkIcon } from '../assets/link.svg'
import { ReactComponent as LocationIcon } from '../assets/location.svg'
import { ReactComponent as MailIcon } from '../assets/mail.svg'
import { ReactComponent as OrgIcon } from '../assets/organization.svg'

const styles = theme => ({
  userAvatar: {
    display: 'block',
    width: '100%',
    borderRadius: '6px'
  },
  userSummary: {
    margin: `${theme.spacing(2)}px 0`,
    overflow: 'hidden',
    '& .username': {
      margin: theme.spacing(1),
      fontSize: 'medium'
    }
  },
  userInfo: {
    fontSize: 'medium',
    '& > p': {
      display: 'flex'
    }
  }
})

export default function ProfileInfoPage(props) {
  const { user } = props

  const classes = makeStyles(styles)()

  return (
    <>
      <img className={classes.userAvatar} src={user.avatar_url} />
      <div className={classes.userSummary}>
        <Typography variant="h6">
          { user.name ? user.name : user.login }
          <span className="username">
            { user.login && (<a href={ user.html_url }>{ `@${user.login}` }</a>) }
          </span>
        </Typography>
        <div>
          <p>{ user.bio }</p>
        </div>
        <div className={classes.userInfo}>
          { user.company && (<p><OrgIcon />{ user.company }</p>) }
          { user.location && (<p><LocationIcon />{ user.location }</p>) }
          { user.email && (<p><MailIcon />{ user.email }</p>) }
          { user.blog && (<p><LinkIcon /><a href={ user.html_url }>{ user.blog }</a></p>) }
        </div>
      </div>
    </>
  )
}

ProfileInfoPage.propTypes = {
  user: PropTypes.object
}
