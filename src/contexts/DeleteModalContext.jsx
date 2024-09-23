import { createContext, useContext, useState } from 'react'

const DeleteModalContext = createContext()

export const DeleteModalProvider = ({ children }) => {
  const [open, setOpen] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const openModal = (id) => {
    setOpen(true)
    if (id) {
      setSelectedId(id)
    }
  }

  const closeModal = () => {
    setOpen(false)
    if (selectedId) {
      setSelectedId(null)
    }
  }

  return <DeleteModalContext.Provider value={{ open, selectedId, openModal, closeModal }}>{children}</DeleteModalContext.Provider>
}

export const useHandleDeleteModal = () => {
  return useContext(DeleteModalContext)
}
