import { createContext, useContext, useState } from 'react'

const MenuActionsContext = createContext()

export const MenuActionsProvider = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const openPopover = (event, id) => {
    setAnchorEl(event.currentTarget)
    setSelectedId(id)
  }

  const closePopover = () => {
    setAnchorEl(null)
    setSelectedId(null)
  }

  return <MenuActionsContext.Provider value={{ anchorEl, selectedId, openPopover, closePopover }}>{children}</MenuActionsContext.Provider>
}

export const useMenuActions = () => {
  return useContext(MenuActionsContext)
}
