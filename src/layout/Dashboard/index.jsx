import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// project import
import Drawer from './Drawer'
import Header from './Header'
import navigation from 'menu-items'
import Loader from 'components/Loader'
import Breadcrumbs from 'components/@extended/Breadcrumbs'

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu'
import DashboardDefault from 'pages/dashboard'

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const location = useLocation()
  const currentPath = location.pathname
  const { menuMasterLoading } = useGetMenuMaster()
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'))

  useEffect(() => {
    handlerDrawerOpen(!downXL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL])

  if (menuMasterLoading) return <Loader />

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        {currentPath === '/' ? <DashboardDefault /> : <Outlet />}

        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={3} px={2}>
          <Typography variant="caption">© All rights reserved</Typography>
          <Stack direction="row">
            <Typography variant="caption">About us</Typography>
            <Typography variant="caption" ml={1.5}>
              Privacy
            </Typography>
            <Typography variant="caption" ml={1.5}>
              Terms
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
