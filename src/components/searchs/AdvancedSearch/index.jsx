import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import useTheme from '@mui/material/styles/useTheme'

import SelectSearch from './SelectSearch'
import AllProductsSearchDialog from './AllProductsSearchDialog'

export default function AdvanceSearch() {
  const theme = useTheme()

  return (
    <Card variant="outlined">
      <CardContent>
        <AllProductsSearchDialog />
        <Divider sx={{ marginY: 2 }} />
        <Box width="100%" textAlign="right">
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Typography variant="h5" mr={1} color={theme.palette.grey[500]} fontWeight={400}>
              Filter
            </Typography>
            <SelectSearch />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
