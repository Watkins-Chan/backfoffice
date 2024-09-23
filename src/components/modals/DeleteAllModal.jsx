import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { DeleteFilled } from '@ant-design/icons'
import { lighten } from '@mui/system'
import { useDeleteAllGenre } from 'hooks/genres/useGenres'

export default function DeleteAllModal(props) {
  const { open, handleClose, refetchGenres } = props

  const { deleteAllGenre, isLoading: isDeleting } = useDeleteAllGenre()

  const id = open

  const onDeleteItem = async () => {
    await deleteAllGenre()
    refetchGenres()
    handleClose()
  }

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose} sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.7)' } }}>
      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ fontSize: '1.75rem', width: 75, height: 75, bgcolor: lighten('#ff4d4f', 0.8), '& > span': { color: '#ff4d4f' } }}>
            <DeleteFilled />
          </Avatar>
          <Typography variant="h4">Are you sure you want to delete all?</Typography>
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
