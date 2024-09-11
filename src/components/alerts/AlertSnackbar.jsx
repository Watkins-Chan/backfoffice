import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AlertSnackbar = ({ open, message, severity = 'success', duration = 6000, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertSnackbar
