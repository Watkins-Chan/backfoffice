import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { FilterOutlined, CloseOutlined } from '@ant-design/icons'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export default function AllProductsSearchDialog() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen} variant="outlined" startIcon={<FilterOutlined />} sx={{ borderColor: theme.palette.grey[500] }}>
        All
      </Button>
      <BootstrapDialog scroll="paper" onClose={handleClose} maxWidth="sm" fullWidth fullScreen={matches} open={open}>
        <DialogTitle fontSize="1.25rem" padding={2} margin={0} fontWeight={500} textAlign="center">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent dividers>
          {[...Array(10)].map((_, index) => (
            <React.Fragment key={index}>
              <Typography variant="h5">Label</Typography>
              {[...Array(10)].map((_, index) => (
                <FormControlLabel key={index} control={<Checkbox defaultChecked />} label="Label" />
              ))}
              {[...Array(10)].length - 1 !== index && <Divider sx={{ my: 2 }} />}
            </React.Fragment>
          ))}
        </DialogContent>
        <DialogActions sx={{ padding: '1.5rem !important', justifyContent: 'space-between' }}>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Delete All
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Result
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}
