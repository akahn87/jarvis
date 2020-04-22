import React from 'react'
import {Inbox as InboxIcon} from '@material-ui/icons'
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import {Link, useLocation} from 'react-router-dom'
import classnames from 'classnames'

// styles
import useStyles from './styles'

function SidebarLink({link, icon, label, isSidebarOpened, type}) {
  const location = useLocation()
  const classes = useStyles()

  // local
  const isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1)

  if (type === 'title')
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    )

  if (type === 'divider') return <Divider className={classes.divider} />

  return (
    <>
      <ListItem
        button
        component={link && Link}
        className={classes.link}
        to={link}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    </>
  )
}

export default SidebarLink
