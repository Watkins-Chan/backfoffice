import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useTheme } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AlertSnackbar = ({ open, message, severity = 'success', duration = 60000, onClose }) => {
  const theme = useTheme()
  return (
    <Snackbar
      sx={{ '& .MuiPaper-root': { color: theme.palette.common.white } }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert sx={{ '& .MuiAlert-message': { fontSize: '0.875rem' } }} onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertSnackbar
