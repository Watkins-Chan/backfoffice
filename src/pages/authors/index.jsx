import React, { memo, useState, useCallback } from 'react'

import _map from 'lodash/map'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import SearchBar from 'components/common/inputs/SearchBar'
import SortOptions from 'components/common/dropdowns/SortOptions'
import AddNewButton from 'components/common/buttons/AddNewButton'
import PaginationControl from 'components/common/navigation/PaginationControl'
import RowPerPageSelector from 'components/common/dropdowns/RowPerPageSelector '
import MenuActions from 'components/common/dropdowns/MenuActions'
import DeleteModal from 'components/common/modals/DeleteModal'
import CardInfo from 'components/authors/CardInfo'
import { useMenuActions } from 'contexts/MenuActionsContext'
import { useHandleDeleteModal } from 'contexts/DeleteModalContext'
import UpsertAuthorModal from 'components/authors/UpsertAuthorModal'

const Authors = () => {
  const { openPopover, closePopover } = useMenuActions()
  const { openDeleteModal, handleOpenDeleteModal } = useHandleDeleteModal()
  const [selectedId, setSelectedId] = useState(null)
  const [openUpsertModal, setOpenUpsertModal] = useState(false)

  const handleOpenUpsertModal = useCallback(() => setOpenUpsertModal(true), [])
  const handleCloseUpsertModal = useCallback(() => setOpenUpsertModal(false), [])

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
        console.log('Edit'), closePopover()
      },
    },
    {
      name: 'Delete',
      func: () => {
        handleOpenDeleteModal(selectedId), closePopover()
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
                <AddNewButton onClick={handleOpenUpsertModal} />
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
      {openDeleteModal && <DeleteModal isDeleting={false} handleDelete={() => {}} refetchGenres={() => {}} />}
      {handleCloseUpsertModal && <UpsertAuthorModal open={openUpsertModal} handleClose={handleCloseUpsertModal} />}
    </React.Fragment>
  )
}

export default memo(Authors)
