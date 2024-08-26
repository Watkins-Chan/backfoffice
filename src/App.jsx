import { RouterProvider } from 'react-router-dom'

// project import
import router from 'routes'
import ThemeCustomization from 'themes'

import ScrollTop from 'components/ScrollTop'
import { ApiProvider } from 'contexts/ApiContext'

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <ApiProvider>
          <RouterProvider router={router} />
        </ApiProvider>
      </ScrollTop>
    </ThemeCustomization>
  )
}
