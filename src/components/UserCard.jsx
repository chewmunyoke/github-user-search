import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    backgroundColor: 'white',
    opacity: 0,
    transition: 'opacity .3s, box-shadow .3s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0 0 0 1px ${theme.palette.primary[500]}, 3px 3px 5px ${theme.palette.primary[500]}`,
      '& .info': {
        color: theme.palette.primary[500]
      }
    },
    '& .info': {
      marginLeft: theme.spacing(2),
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      transition: 'color .3s'
    }
  },
  cardContent: {
    display: 'flex',
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14)
  }
})

export default function UserCard(props) {
  const { index, user, perPage, onClick } = props

  const classes = makeStyles(styles)()

  const [isShow, setIsShow] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setIsShow(true)
    }, ((index % perPage) * 50))
  }, [])

  const styleObj = {
    opacity: 1
  }

  return (
    <Card
      className={classes.card}
      style={ isShow ? styleObj : null }
      onClick={() => onClick(user.login)}
    >
      <CardContent className={classes.cardContent}>
        <Avatar
          className={classes.avatar}
          alt={user.login}
          src={user.avatar_url}
        />
        <div className="info">
          <Typography variant="h6">
            { user.login }
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

UserCard.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  perPage: PropTypes.number.isRequired,
  onClick: PropTypes.func
}
