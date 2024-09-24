import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { DeleteFilled } from '@ant-design/icons'
import { lighten } from '@mui/system'
import { useDeleteGenre } from 'hooks/useGenres'
import { useHandleDeleteModal } from 'contexts/DeleteModalContext'

export default function DeleteModal(props) {
  const { isDeleting, handleDelete, refetchGenres } = props
  const { selectedId, openDeleteModal, handleCloseDeleteModal } = useHandleDeleteModal()

  const onDeleteItem = async () => {
    await handleDelete()
    refetchGenres()
    handleCloseDeleteModal()
  }

  return (
    <Dialog maxWidth="xs" fullWidth open={openDeleteModal} onClose={handleCloseDeleteModal} sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.7)' } }}>
      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ fontSize: '1.75rem', width: 75, height: 75, bgcolor: lighten('#ff4d4f', 0.8), '& > span': { color: '#ff4d4f' } }}>
            <DeleteFilled />
          </Avatar>
          <Typography variant="h4">Are you sure you want to delete?</Typography>
          {selectedId && (
            <Typography align="center">
              By deleting "<b>{selectedId}</b>" user, all task assigned to that user will also be deleted.
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2} mt={3.5}>
          <Button variant="outlined" color="inherit" fullWidth onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <LoadingButton color="error" fullWidth loading={isDeleting} loadingPosition="start" variant="contained" onClick={onDeleteItem}>
            Delete
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
