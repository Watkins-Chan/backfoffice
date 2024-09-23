import { RouterProvider } from 'react-router-dom'

// project import
import router from 'routes'
import ThemeCustomization from 'themes'

import ScrollTop from 'components/ScrollTop'
import { AlertProvider } from 'contexts/AlertContent'
import { MenuActionsProvider } from 'contexts/MenuActionsContext'
import { DeleteModalProvider } from 'contexts/DeleteModalContext'

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AlertProvider>
          <MenuActionsProvider>
            <DeleteModalProvider>
              <RouterProvider router={router} />
            </DeleteModalProvider>
          </MenuActionsProvider>
        </AlertProvider>
      </ScrollTop>
    </ThemeCustomization>
  )
}
