import React from 'react'
import Button from '@mui/material/Button'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import useTheme from '@mui/material/styles/useTheme'

import { DownOutlined } from '@ant-design/icons'

export default function SelectSearch() {
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen) => !previousOpen)
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined

  return (
    <>
      <Button color="inherit" sx={{ borderRadius: 50, borderColor: theme.palette.grey[500] }} variant="outlined" endIcon={<DownOutlined />} onClick={handleClick}>
        Popular
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-end" sx={{ top: '8px !important' }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card elevation={5} sx={{ minWidth: 200 }}>
              <List>
                {[...Array(5)].map((_, index) => (
                  <ListItem disablePadding key={index}>
                    <ListItemButton onClick={handleClick}>
                      <ListItemText primary={`Item ${index}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Fade>
        )}
      </Popper>
    </>
  )
}
