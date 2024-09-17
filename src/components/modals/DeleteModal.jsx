import React, { useEffect } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { DeleteFilled } from '@ant-design/icons'
import { lighten } from '@mui/system'
import { GENRES_API } from 'api/constants'
import { useDeleteGenre, useGenres } from 'apiHooks/useGenres'
import { useURLParams } from 'customHooks/useURLParams'

export default function DeleteModal(props) {
  const { open, handleClose } = props
  const { getParam } = useURLParams()

  const sort = getParam('sort', 'createdAt-desc')
  const sortBy = sort ? sort.split('-')[0] : null
  const sortOrder = sort ? sort.split('-')[1] : null

  const { deleteGenre, isLoading: isDeleting } = useDeleteGenre()
  const { mutate: refetchGenres } = useGenres(getParam('pageSize', 10), getParam('currentPage', 1), getParam('q', null), sortBy, sortOrder)

  const id = open

  const onDeleteItem = async (id) => {
    await deleteGenre(id)
    await refetchGenres()
    handleClose()
  }

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose} sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.7)' } }}>
      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ fontSize: '1.75rem', width: 75, height: 75, bgcolor: lighten('#ff4d4f', 0.8), '& > span': { color: '#ff4d4f' } }}>
            <DeleteFilled />
          </Avatar>
          <Typography variant="h4">Are you sure you want to delete?</Typography>
          <Typography align="center">
            By deleting "<b>{id}</b>" user, all task assigned to that user will also be deleted.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} mt={3.5}>
          <Button variant="outlined" color="inherit" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton color="error" fullWidth loading={isDeleting} loadingPosition="start" variant="contained" onClick={() => onDeleteItem(id)}>
            Delete
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
