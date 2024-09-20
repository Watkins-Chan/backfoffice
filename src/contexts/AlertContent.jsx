import AlertSnackbar from 'components/common/AlertSnackbar'
import React, { createContext, useContext, useState } from 'react'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' })

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity })
  }

  const closeAlert = () => {
    setAlert({ ...alert, open: false })
  }

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <AlertSnackbar open={alert.open} message={alert.message} severity={alert.severity} onClose={closeAlert} />
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  return useContext(AlertContext)
}
