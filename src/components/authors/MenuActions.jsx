import React from 'react'

import _map from 'lodash/map'
import _get from 'lodash/get'

import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useMenuActions } from 'contexts/MenuActionsContext'

const MenuActions = ({ actions }) => {
  const { anchorEl, selectedId, closePopover } = useMenuActions()
  const open = Boolean(anchorEl && selectedId)
  return (
    <Popover
      id={selectedId}
      open={open}
      anchorEl={anchorEl}
      onClose={closePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List>
        {_map(actions, (action, index) => (
          <ListItem disablePadding key={`Action-${index}`}>
            <ListItemButton onClick={_get(action, 'func', () => {})}>
              <ListItemText sx={{ marginY: 0 }} primary={_get(action, 'name')} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Popover>
  )
}

export default MenuActions
