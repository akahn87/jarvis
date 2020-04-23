import React from 'react'
import {Drawer, List} from '@material-ui/core'
import {
  Folder as FolderIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons'
import classNames from 'classnames'

// styles
import useStyles from './styles'

// components
import SidebarLink from './components/SidebarLink'

// context
import {useLayoutState} from '../../context/LayoutContext'
import {useUser} from '../../context/UserContext'

let baseStructure = [
  {
    id: 0,
    label: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    id: 1,
    label: 'Tournaments',
    link: '/tournaments',
    icon: <FolderIcon />,
  },
]

const adminStructure = [
  {id: 100, type: 'divider'},
  {id: 101, type: 'title', label: 'Administration'},
  {
    id: 102,
    label: 'Admin',
    link: '/admin',
    icon: <HomeIcon />,
  },
  {
    id: 103,
    label: 'Settings',
    link: '/admin/settings',
    icon: <SettingsIcon />,
  },
]

function Sidebar() {
  const classes = useStyles()
  const user = useUser()

  const structure = [
    ...baseStructure,
    ...(user && user.role === 'ADMIN' ? adminStructure : []),
  ]

  // global
  const {isSidebarOpened} = useLayoutState()

  return (
    <Drawer
      variant={'permanent'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
