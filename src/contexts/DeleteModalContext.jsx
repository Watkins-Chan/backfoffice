import { createContext, useContext, useState } from 'react'

const DeleteModalContext = createContext()

export const DeleteModalProvider = ({ children }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true)
    if (id) {
      setSelectedId(id)
    }
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    if (selectedId) {
      setSelectedId(null)
    }
  }

  return <DeleteModalContext.Provider value={{ openDeleteModal, selectedId, handleOpenDeleteModal, handleCloseDeleteModal }}>{children}</DeleteModalContext.Provider>
}

export const useHandleDeleteModal = () => {
  return useContext(DeleteModalContext)
}
