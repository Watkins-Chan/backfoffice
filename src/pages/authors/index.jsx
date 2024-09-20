import React, { memo } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import SearchBar from 'components/common/SearchBar'
import SortOptions from 'components/common/SortOptions'
import AddNewButton from 'components/common/AddNewButton'

const Authors = () => {
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Box>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md="auto">
              <SearchBar />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SortOptions />
                <AddNewButton />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box>2</Box>
        <Box>3</Box>
      </Stack>
    </React.Fragment>
  )
}

export default memo(Authors)
