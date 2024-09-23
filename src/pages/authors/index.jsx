import React, { memo, useState } from 'react'

import _map from 'lodash/map'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import SearchBar from 'components/common/SearchBar'
import SortOptions from 'components/common/SortOptions'
import AddNewButton from 'components/common/AddNewButton'
import CardInfo from 'components/authors/CardInfo'
import PaginationControl from 'components/common/PaginationControl'
import RowPerPageSelector from 'components/common/RowPerPageSelector '
import MenuActions from 'components/authors/MenuActions'
import { useMenuActions } from 'contexts/MenuActionsContext'
import { useHandleDeleteModal } from 'contexts/DeleteModalContext'
import DeleteModal from 'components/modals/DeleteModal'

const Authors = () => {
  const { openPopover, closePopover } = useMenuActions()
  const { open, openModal, closeModal } = useHandleDeleteModal()
  const [selectedId, setSelectedId] = useState(null)

  const actions = [
    {
      name: 'Export PDF',
      func: () => {
        console.log('Export PDF'), closePopover()
      },
    },
    {
      name: 'Edit',
      func: () => {
        openModal(selectedId), closePopover()
      },
    },
    {
      name: 'Delete',
      func: () => {
        openModal(selectedId), closePopover()
      },
    },
  ]

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
        <Box>
          <Grid container spacing={2}>
            {_map([...Array(20)], (_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <CardInfo
                  onOpenMenu={(event) => {
                    openPopover(event, index + 1), setSelectedId(index + 1)
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box py={2}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <RowPerPageSelector />
            </Grid>
            <Grid item>
              <PaginationControl />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <MenuActions actions={actions} />
      {open && <DeleteModal open={open} handleClose={closeModal} />}
    </React.Fragment>
  )
}

export default memo(Authors)
