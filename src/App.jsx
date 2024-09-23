import { RouterProvider } from 'react-router-dom'

// project import
import router from 'routes'
import ThemeCustomization from 'themes'

import ScrollTop from 'components/ScrollTop'
import { AlertProvider } from 'contexts/AlertContent'
import { MenuActionsProvider } from 'contexts/MenuActionsContext'

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AlertProvider>
          <MenuActionsProvider>
            <RouterProvider router={router} />
          </MenuActionsProvider>
        </AlertProvider>
      </ScrollTop>
    </ThemeCustomization>
  )
}
